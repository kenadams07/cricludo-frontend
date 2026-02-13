"use client";

import { useMemo, useState, useEffect } from "react";
import { Gift } from "@/types/gift";
import { filterValidGifts, sortGiftsByOrder } from "@/lib/gift-utils";
import { GiftCard } from "./gift-card";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Button } from "./ui/button";
import { useUpdateGiftsOrder } from "@/hooks/useAppConfig";

interface GiftGridProps {
  data: Gift[];
}

function SortableItem({ gift, onDelete }: { gift: Gift; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: gift._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <GiftCard
        gift={gift}
        dragHandleProps={listeners}
        dragAttributes={attributes}
        onDelete={onDelete}
      />
    </div>
  );
}

export function GiftGrid({ data }: GiftGridProps) {
  const sortedInitial = useMemo(() => {
    const validData = filterValidGifts(data);
    return sortGiftsByOrder(validData);
  }, [data]);

  const [items, setItems] = useState(sortedInitial);
  const [isDirty, setIsDirty] = useState(false);

  const { trigger, isMutating } = useUpdateGiftsOrder();

  useEffect(() => {
    if (!isDirty) setItems(sortedInitial);
  }, [sortedInitial]);

  useEffect(() => {
    const changed =
      items.length !== sortedInitial.length ||
      items.some((g, i) => g._id !== sortedInitial[i]?._id);
    console.log(changed, "changed");
    console.log(items);
    setIsDirty(() => changed);
  }, [items, sortedInitial]);

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.findIndex((g) => g._id === active.id);
      const newIndex = prev.findIndex((g) => g._id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  async function handleSave() {
    const giftIds = items.map((g) => g.id);
    try {
      await trigger({ giftIds });
      setIsDirty(false);
    } catch (error) {
      console.error("Failed to save order:", error);
      setIsDirty(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No gifts yet. Click "Add Gift" to create your first one.
      </div>
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((g) => g._id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((gift) => (
            <SortableItem key={String(gift._id)} gift={gift} onDelete={handleDeleteItem} />
          ))}
        </div>
      </SortableContext>

      <div className="mt-5">
        {isDirty && (
          <div className="flex gap-3">
            <Button className="bg-green-900" type="button" onClick={handleSave} disabled={isMutating}>
              {isMutating ? "Saving..." : "Save"}
            </Button>
            <Button className="bg-gray-700" type="button" onClick={() => setItems(() => sortedInitial)}>
              cancel
            </Button>
          </div>
        )}
      </div>
    </DndContext>
  );
}
