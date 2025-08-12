import { useState } from 'react';
import { Class, mockClasses } from '../lib/mock-data';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Plus, MoreVertical, GraduationCap, Users, Calendar, Clock, Edit, Trash } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

export function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = classes.filter(classItem => 
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (classItem: Class) => {
    // Placeholder for edit functionality
    console.log('Edit class:', classItem);
  };

  const handleDelete = (classItem: Class) => {
    setClasses(prev => prev.filter(c => c.id !== classItem.id));
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Classes</h2>
          <p className="text-sm text-muted-foreground">Manage class schedules</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search classes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Classes List */}
      <div className="space-y-3">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="p-0">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{classItem.name}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(classItem)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(classItem)}
                          className="text-destructive"
                        >
                          <Trash className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{classItem.courseName}</p>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">
                        {classItem.teacherName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{classItem.teacherName}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{classItem.schedule}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <Badge variant="outline" className="text-xs">
                        {classItem.enrolledStudents}/{classItem.maxStudents}
                      </Badge>
                    </div>
                    
                    <Badge 
                      variant={new Date(classItem.endDate) > new Date() ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {new Date(classItem.endDate) > new Date() ? 'Active' : 'Ended'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground text-center py-2">
        Showing {filteredClasses.length} of {classes.length} classes
      </div>
    </div>
  );
}