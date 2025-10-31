"use client"

import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { IconEdit } from "@tabler/icons-react"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./ui/select"
import { formatPlaytime } from "@/lib/utils"
import useSWRMutation from "swr/mutation"
import { PutRequest } from "@/lib/fetcher"
import { API_URL } from "@/lib/config"

interface EditUserAccountDialogProps {
   user: {
      id: string
      active: boolean
      rating: number
      totalTimeSpent: number
      coin: number
      diamond: number
      live: number
      walletBalance?: number
   }
   open: boolean
   onOpenChange: (open: boolean) => void
   onSuccess?: () => void
}

export function EditUserAccountDialog({
   user,
   open,
   onOpenChange,
   onSuccess,
}: EditUserAccountDialogProps) {
   const [status, setStatus] = useState<string>(user?.active ? "active" : "inactive")
   const [rating, setRating] = useState<string>(String(user?.rating || 0))
   const [timeSpentHours, setTimeSpentHours] = useState<string>("0")
   const [timeSpentMinutes, setTimeSpentMinutes] = useState<string>("0")
   const [timeSpentSeconds, setTimeSpentSeconds] = useState<string>("0")
   const [coin, setCoin] = useState<string>(String(user?.coin || 0))
   const [diamond, setDiamond] = useState<string>(String(user?.diamond || 0))
   const [lives, setLives] = useState<string>(String(user?.live || 0))
   const [walletBalance, setWalletBalance] = useState<string>(
      String(user?.walletBalance || 0)
   )

   const { trigger, isMutating } = useSWRMutation(
      `${API_URL}/user/update-account-info`,
      PutRequest
   )

   // Convert timeSpent from milliseconds to hours, minutes, seconds
   useEffect(() => {
      if (user?.totalTimeSpent) {
         const totalSeconds = Math.floor(user.totalTimeSpent / 1000)
         const hours = Math.floor(totalSeconds / 3600)
         const minutes = Math.floor((totalSeconds % 3600) / 60)
         const seconds = totalSeconds % 60
         setTimeSpentHours(String(hours))
         setTimeSpentMinutes(String(minutes))
         setTimeSpentSeconds(String(seconds))
      }
   }, [user, open])

   // Reset form when dialog opens/closes
   useEffect(() => {
      if (open) {
         setStatus(user?.active ? "active" : "inactive")
         setRating(String(user?.rating || 0))
         setCoin(String(user?.coin || 0))
         setDiamond(String(user?.diamond || 0))
         setLives(String(user?.live || 0))
         setWalletBalance(String(user?.walletBalance || 0))

         if (user?.totalTimeSpent) {
            const totalSeconds = Math.floor(user.totalTimeSpent / 1000)
            const hours = Math.floor(totalSeconds / 3600)
            const minutes = Math.floor((totalSeconds % 3600) / 60)
            const seconds = totalSeconds % 60
            setTimeSpentHours(String(hours))
            setTimeSpentMinutes(String(minutes))
            setTimeSpentSeconds(String(seconds))
         }
      }
   }, [open, user])

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      // Convert time spent back to milliseconds
      const totalSeconds =
         parseInt(timeSpentHours || "0") * 3600 +
         parseInt(timeSpentMinutes || "0") * 60 +
         parseInt(timeSpentSeconds || "0")
      const totalTimeSpentMs = totalSeconds * 1000

      const data = {
         userId: user.id,
         status: status === "active" ? "1" : "0",
         rating: parseFloat(rating) || 0,
         totalTimeSpent: totalTimeSpentMs,
         coin: parseInt(coin) || 0,
         diamond: parseInt(diamond) || 0,
         lives: parseInt(lives) || 0,
         walletBalance: parseInt(walletBalance) || 0,
      }

      try {
         const response = await trigger(data)
         if (response?.code) {
            toast.error(response.message || "Failed to update user account info")
            return
         }
         toast.success("User account info updated successfully")
         onOpenChange(false)
         onSuccess?.()
      } catch (err) {
         console.error(err)
         toast.error("Failed to update user account info")
      }
   }

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className='sm:max-w-2xl max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
               <DialogTitle className='text-2xl font-semibold'>
                  Edit Account Information
               </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className='space-y-6 py-4'>
               {/* Status */}
               <div className='space-y-2'>
                  <Label htmlFor='status'>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                     <SelectTrigger id='status'>
                        <SelectValue placeholder='Select status' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value='active'>Active</SelectItem>
                        <SelectItem value='inactive'>Inactive</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               {/* Rating */}
               <div className='space-y-2'>
                  <Label htmlFor='rating'>Rating (%)</Label>
                  <Input
                     id='rating'
                     type='number'
                     step='0.1'
                     value={rating}
                     onChange={(e) => setRating(e.target.value)}
                     placeholder='Enter rating'
                  />
               </div>

               {/* Time Spent */}
               <div className='space-y-2'>
                  <Label>Time Spent</Label>
                  <div className='grid grid-cols-3 gap-2'>
                     <div>
                        <Label htmlFor='hours' className='text-xs text-muted-foreground'>
                           Hours
                        </Label>
                        <Input
                           id='hours'
                           type='number'
                           min='0'
                           value={timeSpentHours}
                           onChange={(e) => setTimeSpentHours(e.target.value)}
                           placeholder='0'
                        />
                     </div>
                     <div>
                        <Label
                           htmlFor='minutes'
                           className='text-xs text-muted-foreground'
                        >
                           Minutes
                        </Label>
                        <Input
                           id='minutes'
                           type='number'
                           min='0'
                           max='59'
                           value={timeSpentMinutes}
                           onChange={(e) => setTimeSpentMinutes(e.target.value)}
                           placeholder='0'
                        />
                     </div>
                     <div>
                        <Label
                           htmlFor='seconds'
                           className='text-xs text-muted-foreground'
                        >
                           Seconds
                        </Label>
                        <Input
                           id='seconds'
                           type='number'
                           min='0'
                           max='59'
                           value={timeSpentSeconds}
                           onChange={(e) => setTimeSpentSeconds(e.target.value)}
                           placeholder='0'
                        />
                     </div>
                  </div>
               </div>

               {/* Coin */}
               <div className='space-y-2'>
                  <Label htmlFor='coin'>Coin</Label>
                  <Input
                     id='coin'
                     type='number'
                     min='0'
                     value={coin}
                     onChange={(e) => setCoin(e.target.value)}
                     placeholder='Enter coin amount'
                  />
               </div>

               {/* Diamond */}
               <div className='space-y-2'>
                  <Label htmlFor='diamond'>Diamond</Label>
                  <Input
                     id='diamond'
                     type='number'
                     min='0'
                     value={diamond}
                     onChange={(e) => setDiamond(e.target.value)}
                     placeholder='Enter diamond amount'
                  />
               </div>

               {/* Lives */}
               <div className='space-y-2'>
                  <Label htmlFor='lives'>Lives</Label>
                  <Input
                     id='lives'
                     type='number'
                     min='0'
                     value={lives}
                     onChange={(e) => setLives(e.target.value)}
                     placeholder='Enter lives count'
                  />
               </div>

               {/* Wallet Balance */}
               <div className='space-y-2'>
                  <Label htmlFor='wallet-balance'>Wallet Balance</Label>
                  <Input
                     id='wallet-balance'
                     type='number'
                     min='0'
                     value={walletBalance}
                     onChange={(e) => setWalletBalance(e.target.value)}
                     placeholder='Enter wallet balance'
                  />
               </div>

               <div className='flex justify-end gap-2 pt-4'>
                  <Button
                     type='button'
                     variant='outline'
                     onClick={() => onOpenChange(false)}
                     disabled={isMutating}
                  >
                     Cancel
                  </Button>
                  <Button type='submit' disabled={isMutating}>
                     {isMutating ? "Saving..." : "Save Changes"}
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   )
}
