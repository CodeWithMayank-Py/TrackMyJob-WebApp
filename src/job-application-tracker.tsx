"use client"

import { useState} from "react"
import { Button } from "components/ui/button";
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table"
import { Textarea } from "components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { Checkbox } from "components/ui/checkbox"
import { Settings, Plus, Pencil, Trash2, ArrowUpDown, Filter, User, LogOut } from "lucide-react"

type JobApplication = {
  id: number
  company: string
  position: string
  status: string
  dateApplied: string
  notes: string
}

type UserProfile = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export default function JobApplicationTracker() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [newApplication, setNewApplication] = useState<Omit<JobApplication, "id">>({
    company: "",
    position: "",
    status: "",
    dateApplied: "",
    notes: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [statusFilters, setStatusFilters] = useState<string[]>([])
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (isEditDialogOpen && editingApplication) {
      setEditingApplication({ ...editingApplication, [name]: value })
    } else {
      setNewApplication({ ...newApplication, [name]: value })
    }
  }

  const handleStatusChange = (value: string) => {
    if (isEditDialogOpen && editingApplication) {
      setEditingApplication({ ...editingApplication, status: value })
    } else {
      setNewApplication({ ...newApplication, status: value })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditDialogOpen && editingApplication) {
      setApplications(applications.map(app => 
        app.id === editingApplication.id ? editingApplication : app
      ))
      setIsEditDialogOpen(false)
    } else {
      setApplications([...applications, { ...newApplication, id: Date.now() }])
      setIsAddDialogOpen(false)
    }
    setNewApplication({ company: "", position: "", status: "", dateApplied: "", notes: "" })
  }

  const handleDelete = (id: number) => {
    setApplications(applications.filter((app) => app.id !== id))
  }

  const handleEdit = (application: JobApplication) => {
    setEditingApplication(application)
    setIsEditDialogOpen(true)
  }

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilters(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    )
  }

  const clearFilters = () => {
    setStatusFilters([])
  }

  const filteredAndSortedApplications = applications
    .filter(app => statusFilters.length === 0 || statusFilters.includes(app.status))
    .sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime()
      const dateB = new Date(b.dateApplied).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Applied":
        return "border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
      case "Interviewing":
        return "border-blue-500 text-blue-500 hover:bg-blue-500/10"
      case "Offer":
        return "border-green-500 text-green-500 hover:bg-green-500/10"
      case "Rejected":
        return "border-red-500 text-red-500 hover:bg-red-500/10"
      default:
        return "border-gray-400 text-gray-400 hover:bg-gray-400/10"
    }
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the profile to Firebase
    console.log("Saving profile:", userProfile)
    setIsProfileModalOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <style>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #D1D5DB;
        }
        ::-webkit-scrollbar-thumb {
          background: #6B7280;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #4B5563;
        }
      `}</style>
      <nav className="flex justify-between items-center px-4 py-3 bg-[#3B82F6] text-white fixed top-0 left-0 right-0 z-10 shadow-md">
        <h1 className="text-xl font-bold">Job Application Tracker</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onSelect={() => setIsProfileModalOpen(true)}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <main className="flex-grow p-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Applications</h2>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#34D399] hover:bg-[#2EB37A] text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Application
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#F3F4F6] rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-gray-800">Add New Application</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-700">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={newApplication.company}
                        onChange={handleInputChange}
                        required
                        className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-gray-700">Position</Label>
                      <Input
                        id="position"
                        name="position"
                        value={newApplication.position}
                        onChange={handleInputChange}
                        required
                        className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-gray-700">Status</Label>
                      <Select onValueChange={handleStatusChange} value={newApplication.status}>
                        <SelectTrigger className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Applied">Applied</SelectItem>
                          <SelectItem value="Interviewing">Interviewing</SelectItem>
                          <SelectItem value="Offer">Offer</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateApplied" className="text-gray-700">Date Applied</Label>
                      <Input
                        id="dateApplied"
                        name="dateApplied"
                        type="date"
                        value={newApplication.dateApplied}
                        onChange={handleInputChange}
                        required
                        className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-gray-700">Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={newApplication.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-[#34D399] hover:bg-[#2EB37A] text-white">
                    Add Application
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-[#F9FAFB] rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableHeader className="bg-[#E5E7EB]">
                <TableRow>
                  <TableHead className="font-bold text-gray-700">Company</TableHead>
                  <TableHead className="font-bold text-gray-700">Position</TableHead>
                  <TableHead className="font-bold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <span>Status</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Filter status</span>
                            <Filter className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {["Applied", "Interviewing", "Offer", "Rejected"].map((status) => (
                            <DropdownMenuItem key={status} className="flex items-center space-x-2">
                              <Checkbox
                                id={`filter-${status}`}
                                checked={statusFilters.includes(status)}
                                onCheckedChange={() => handleStatusFilter(status)}
                              />
                              <label htmlFor={`filter-${status}`}>{status}</label>
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onSelect={clearFilters}>
                            Clear filters
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <span>Date Applied</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={handleSort}
                      >
                        <span className="sr-only">Sort by date</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">Notes</TableHead>
                  <TableHead className="font-bold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedApplications.map((app) => (
                  <TableRow key={app.id} className="hover:bg-gray-100">
                    <TableCell className="font-medium text-gray-900">{app.company}</TableCell>
                    <TableCell className="text-gray-700">{app.position}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(app.status)}`}>
                        {app.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-700">{app.dateApplied}</TableCell>
                    <TableCell className="text-gray-700">{app.notes}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(app)}
                          className="rounded-full border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(app.id)}
                          className="rounded-full border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#F3F4F6] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-gray-800">Edit Application</DialogTitle>
          </DialogHeader>
          {editingApplication && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-company" className="text-gray-700">Company</Label>
                  <Input
                    id="edit-company"
                    name="company"
                    value={editingApplication.company}
                    onChange={handleInputChange}
                    required
                    className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-position" className="text-gray-700">Position</Label>
                  <Input
                    id="edit-position"
                    name="position"
                    value={editingApplication.position}
                    onChange={handleInputChange}
                    required
                    className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status" className="text-gray-700">Status</Label>
                  <Select onValueChange={handleStatusChange} value={editingApplication.status}>
                    <SelectTrigger className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Interviewing">Interviewing</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-dateApplied" className="text-gray-700">Date Applied</Label>
                  <Input
                    id="edit-dateApplied"
                    name="dateApplied"
                    type="date"
                    value={editingApplication.dateApplied}
                    onChange={handleInputChange}
                    required
                    className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-notes" className="text-gray-700">Notes</Label>
                  <Textarea
                    id="edit-notes"
                    name="notes"
                    value={editingApplication.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="bg-[#F3F4F6] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-gray-800">Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={userProfile.firstName}
                  onChange={handleProfileChange}
                  required
                  className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={userProfile.lastName}
                  onChange={handleProfileChange}
                  required
                  className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userProfile.email}
                  onChange={handleProfileChange}
                  required
                  className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-700">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={userProfile.phoneNumber}
                  onChange={handleProfileChange}
                  required
                  className="rounded-md focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsProfileModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}