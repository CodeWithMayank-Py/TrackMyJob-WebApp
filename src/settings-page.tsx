"use client"

import { useState } from "react"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog"
import { Separator } from "components/ui/separator"
import { Sun, Moon, Download, AlertTriangle, ArrowLeft } from "lucide-react"


export default function SettingsPage() {
  const [theme, setTheme] = useState("light")
  const [followUpReminder, setFollowUpReminder] = useState("3 Days")
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY")
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)

  const handleThemeChange = (value: string) => {
    setTheme(value)
    // Here you would implement the logic to actually change the theme
    console.log(`Theme changed to ${value}`)
  }

  const handleFollowUpReminderChange = (value: string) => {
    setFollowUpReminder(value)
    console.log(`Follow-up reminder set to ${value}`)
  }

  const handleDateFormatChange = (value: string) => {
    setDateFormat(value)
    console.log(`Date format changed to ${value}`)
  }

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would implement the logic to change the password
    console.log("Password change requested")
    setIsPasswordModalOpen(false)
  }

  const handleExportData = () => {
    // Here you would implement the logic to export data as CSV
    console.log("Exporting data as CSV")
  }

  const handleDeleteAccount = () => {
    // Here you would implement the logic to delete the account
    console.log("Account deletion requested")
    setIsDeleteAccountModalOpen(false)
  }

  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate("/") // Adjust this path according to your routes to go back to the main page
  }

  return (
    <div className="container mx-auto px-28 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button
          variant="outline"
          onClick={handleBackClick}
          className="h-14 w-14 rounded-full rounded-full border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
        >
          <ArrowLeft className="h-10 w-10" />
        </Button>
      </div>

      <div className="space-y-8">
        {/* Theme Settings */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Theme Settings</h2>
          <div className="flex justify-between items-center">
            <Label htmlFor="theme-select">Select Theme</Label>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center">
                    <Sun className="mr-2 h-4 w-4" />
                    Light Theme
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center">
                    <Moon className="mr-2 h-4 w-4" />
                    Dark Theme
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Notification Preferences */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Notification Preferences</h2>
          <div className="flex justify-between items-center">
            <Label htmlFor="reminder-select">Follow-up Reminders</Label>
            <Select value={followUpReminder} onValueChange={handleFollowUpReminderChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select reminder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3 Days">3 Days</SelectItem>
                <SelectItem value="7 Days">7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Profile Settings */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
          <div className="flex justify-between items-center">
            <Label>Change Password</Label>
            <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Change Password</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Enter your current password and a new password to change it.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" required />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" required />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" required />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsPasswordModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Separator />

        {/* Data Export */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Data Export</h2>
          <div className="flex justify-between items-center">
            <Label>Export Data</Label>
            <Button onClick={handleExportData} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </div>
        </div>

        <Separator />

        {/* Account Management */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Account Management</h2>
          <div className="flex justify-between items-center">
            <Label>Delete Account</Label>
            <Dialog open={isDeleteAccountModalOpen} onOpenChange={setIsDeleteAccountModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete your account? This action is irreversible.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center p-4">
                  <AlertTriangle className="h-16 w-16 text-red-500" />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteAccountModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Confirm Deletion
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Separator />

        {/* Language and Region Settings */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Language and Region Settings</h2>
          <div className="flex justify-between items-center">
            <Label htmlFor="date-format-select">Select Date Format</Label>
            <Select value={dateFormat} onValueChange={handleDateFormatChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}