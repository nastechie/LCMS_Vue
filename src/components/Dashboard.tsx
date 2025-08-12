import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, BookOpen, GraduationCap, DollarSign, TrendingUp, AlertCircle, ChevronRight, UserCheck } from 'lucide-react';
import { dashboardStats, mockEnrollments, mockClasses } from '../lib/mock-data';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

export function Dashboard() {
  const recentEnrollments = mockEnrollments.slice(0, 4);
  const upcomingClasses = mockClasses.filter(c => new Date(c.startDate) > new Date()).slice(0, 3);

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Learning center overview</p>
      </div>

      {/* Statistics Cards - Mobile Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-primary" />
              <TrendingUp className="h-3 w-3 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">{dashboardStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <TrendingUp className="h-3 w-3 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">{dashboardStats.activeClasses}</div>
            <p className="text-xs text-muted-foreground">Active Classes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <DollarSign className="h-5 w-5 text-green-600" />
              <TrendingUp className="h-3 w-3 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">${dashboardStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-red-950 dark:to-orange-950">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold text-red-600">{dashboardStats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Enrollments */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4" />
              Recent Enrollments
            </CardTitle>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {recentEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {enrollment.studentName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{enrollment.studentName}</p>
                  <p className="text-xs text-muted-foreground truncate">{enrollment.className}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={enrollment.status === 'Active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {enrollment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 flex-col gap-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">Add Student</span>
            </Button>
            <Button variant="outline" className="h-12 flex-col gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs">New Course</span>
            </Button>
            <Button variant="outline" className="h-12 flex-col gap-1">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs">Create Class</span>
            </Button>
            <Button variant="outline" className="h-12 flex-col gap-1">
              <UserCheck className="h-4 w-4" />
              <span className="text-xs">Add Teacher</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Classes */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" />
              Upcoming Classes
            </CardTitle>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <p className="text-sm font-medium">{classItem.name}</p>
                  <p className="text-xs text-muted-foreground">{classItem.teacherName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium">{classItem.schedule.split(' ')[0]}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(classItem.startDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}