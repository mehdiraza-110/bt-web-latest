"use client";

import { Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard,
  School, 
  GraduationCap, 
  FileText,
  Calendar,
  BookOpen,
  TrendingUp,
  Users,
  Plus,
  Edit,
  Trash2,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
    { title: "Institutes", icon: GraduationCap, path: "/admin-dashboard?tab=institutes" },
    { title: "Admissions", icon: Calendar, path: "/admin-dashboard?tab=admissions" },
    { title: "Tests", icon: FileText, path: "/admin-dashboard?tab=tests" },
    { title: "Blog", icon: BookOpen, path: "/admin-dashboard?tab=blog" },
    { title: "Analytics", icon: TrendingUp, path: "/admin-dashboard?tab=analytics" },
  ];

  const currentTab = searchParams.get("tab") || "overview";

  const stats = [
    { title: "Total Institutes", value: "6,700+", icon: GraduationCap, color: "text-primary" },
    { title: "Active Admissions", value: "245", icon: Calendar, color: "text-secondary" },
    { title: "Total Tests", value: "12", icon: FileText, color: "text-accent" },
    { title: "Total Visitors", value: "45,678", icon: Users, color: "text-green-500" },
  ];

  const recentInstitutes = [
    { id: 1, name: "NUST", type: "University", city: "Islamabad", status: "Active" },
    { id: 2, name: "Beaconhouse School", type: "School", city: "Lahore", status: "Active" },
    { id: 3, name: "KIPS College", type: "College", city: "Lahore", status: "Pending" },
  ];

  const recentAdmissions = [
    { id: 1, institute: "NUST", program: "BS Computer Science", deadline: "June 30, 2025", status: "Open" },
    { id: 2, institute: "AKU", program: "MBBS", deadline: "May 15, 2025", status: "Closing Soon" },
    { id: 3, institute: "LUMS", program: "BBA", deadline: "July 20, 2025", status: "Open" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <School className="h-8 w-8 text-primary" />
            <div>
              <h2 className="font-bold text-lg text-foreground">Beyond Taleem</h2>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = 
              (item.path === "/admin-dashboard" && currentTab === "overview") ||
              item.path.includes(`tab=${currentTab}`);
            
            return (
              // <Link
              //   key={item.title}
              //   href={item.path}
              //   className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              //     isActive
              //       ? "bg-primary text-primary-foreground"
              //       : "text-muted-foreground hover:bg-muted hover:text-foreground"
              //   }`}
              // >
              //   <item.icon className="h-5 w-5" />
              //   <span className="font-medium">{item.title}</span>
              // </Link>
              <a key={item.title} className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" href={item.path}>{item.title}</a>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <Link href="/admin-login">
            <Button variant="outline" className="w-full justify-start gap-3">
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {currentTab === "overview" ? "Dashboard Overview" : 
                 currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your educational platform content
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">
                View Website
              </Button>
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          <Tabs value={currentTab} className="w-full">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                        <div className={`${stat.color} bg-opacity-10 p-3 rounded-lg`}>
                          <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Institutes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentInstitutes.map((institute) => (
                        <div key={institute.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <p className="font-medium">{institute.name}</p>
                            <p className="text-sm text-muted-foreground">{institute.type} • {institute.city}</p>
                          </div>
                          <Badge variant={institute.status === "Active" ? "default" : "secondary"}>
                            {institute.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Admissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAdmissions.map((admission) => (
                        <div key={admission.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <p className="font-medium">{admission.institute}</p>
                            <p className="text-sm text-muted-foreground">{admission.program}</p>
                          </div>
                          <Badge 
                            variant={admission.status === "Open" ? "default" : "secondary"}
                            className={admission.status === "Closing Soon" ? "bg-red-500 text-white" : ""}
                          >
                            {admission.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Institutes Tab */}
            <TabsContent value="institutes">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Manage Institutes</CardTitle>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Institute
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentInstitutes.map((institute) => (
                        <TableRow key={institute.id}>
                          <TableCell className="font-medium">{institute.name}</TableCell>
                          <TableCell>{institute.type}</TableCell>
                          <TableCell>{institute.city}</TableCell>
                          <TableCell>
                            <Badge variant={institute.status === "Active" ? "default" : "secondary"}>
                              {institute.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Admissions Tab */}
            <TabsContent value="admissions">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Manage Admissions</CardTitle>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Admission
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Institute</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAdmissions.map((admission) => (
                        <TableRow key={admission.id}>
                          <TableCell className="font-medium">{admission.institute}</TableCell>
                          <TableCell>{admission.program}</TableCell>
                          <TableCell>{admission.deadline}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={admission.status === "Open" ? "default" : "secondary"}
                              className={admission.status === "Closing Soon" ? "bg-red-500 text-white" : ""}
                            >
                              {admission.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tests Tab */}
            <TabsContent value="tests">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Manage Tests</CardTitle>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Test
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {["MDCAT", "ECAT", "NUST Entry Test", "IELTS", "SAT", "CSS"].map((test, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">{test}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Tab */}
            <TabsContent value="blog">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Manage Blog Posts</CardTitle>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Blog management interface - Create, edit, and delete blog posts
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Analytics Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-6 bg-muted rounded-lg">
                      <h3 className="font-semibold mb-2">Visitor Statistics</h3>
                      <p className="text-sm text-muted-foreground">
                        Track user engagement, page views, and conversion rates
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border border-border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Most Viewed Institutes</p>
                        <p className="text-2xl font-bold">NUST, LUMS, AKU</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Top Searches</p>
                        <p className="text-2xl font-bold">Engineering, Medical</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}

