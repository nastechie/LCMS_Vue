export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  address: string;
  photo?: string;
  enrolledClasses: number;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  durationMonths: number;
  fee: number;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  specializations: string[];
}

export interface Class {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  schedule: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  enrolledStudents: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  enrollmentDate: string;
  status: 'Active' | 'Completed' | 'Dropped';
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
}

export interface User {
  id: string;
  email: string;
  role: 'Admin' | 'Teacher' | 'Student';
  profileId: string;
  profileName: string;
}

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1-555-0101',
    gender: 'Female',
    dateOfBirth: '1995-03-15',
    address: '123 Main St, Springfield, IL 62701',
    enrolledClasses: 2
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    phone: '+1-555-0102',
    gender: 'Male',
    dateOfBirth: '1992-07-22',
    address: '456 Oak Ave, Springfield, IL 62701',
    enrolledClasses: 1
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    phone: '+1-555-0103',
    gender: 'Female',
    dateOfBirth: '1998-11-08',
    address: '789 Pine Rd, Springfield, IL 62701',
    enrolledClasses: 3
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '+1-555-0104',
    gender: 'Male',
    dateOfBirth: '1994-05-30',
    address: '321 Elm St, Springfield, IL 62701',
    enrolledClasses: 1
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'General English',
    description: 'Comprehensive English language course covering all basic skills',
    durationMonths: 6,
    fee: 800
  },
  {
    id: '2',
    name: 'Business English',
    description: 'Professional English for business communication and presentations',
    durationMonths: 4,
    fee: 950
  },
  {
    id: '3',
    name: 'IELTS Preparation',
    description: 'Intensive preparation course for IELTS examination',
    durationMonths: 3,
    fee: 750
  },
  {
    id: '4',
    name: 'Conversational English',
    description: 'Focus on speaking and listening skills for daily conversation',
    durationMonths: 4,
    fee: 600
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@lcms.edu',
    phone: '+1-555-0201',
    specializations: ['IELTS', 'Academic English', 'Grammar']
  },
  {
    id: '2',
    name: 'James Rodriguez',
    email: 'james.rodriguez@lcms.edu',
    phone: '+1-555-0202',
    specializations: ['Business English', 'Presentation Skills', 'Writing']
  },
  {
    id: '3',
    name: 'Emma Thompson',
    email: 'emma.thompson@lcms.edu',
    phone: '+1-555-0203',
    specializations: ['Conversational English', 'Pronunciation', 'Cultural Studies']
  }
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'General English A1',
    courseId: '1',
    courseName: 'General English',
    teacherId: '1',
    teacherName: 'Dr. Sarah Mitchell',
    schedule: 'Mon/Wed/Fri 9:00-11:00 AM',
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    maxStudents: 20,
    enrolledStudents: 15
  },
  {
    id: '2',
    name: 'Business English Pro',
    courseId: '2',
    courseName: 'Business English',
    teacherId: '2',
    teacherName: 'James Rodriguez',
    schedule: 'Tue/Thu 2:00-4:00 PM',
    startDate: '2024-02-01',
    endDate: '2024-06-01',
    maxStudents: 15,
    enrolledStudents: 12
  },
  {
    id: '3',
    name: 'IELTS Intensive',
    courseId: '3',
    courseName: 'IELTS Preparation',
    teacherId: '1',
    teacherName: 'Dr. Sarah Mitchell',
    schedule: 'Mon-Fri 10:00-12:00 AM',
    startDate: '2024-03-01',
    endDate: '2024-06-01',
    maxStudents: 12,
    enrolledStudents: 10
  },
  {
    id: '4',
    name: 'Conversation Club',
    courseId: '4',
    courseName: 'Conversational English',
    teacherId: '3',
    teacherName: 'Emma Thompson',
    schedule: 'Sat 10:00-12:00 PM',
    startDate: '2024-01-20',
    endDate: '2024-05-20',
    maxStudents: 25,
    enrolledStudents: 18
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Alice Johnson',
    classId: '1',
    className: 'General English A1',
    enrollmentDate: '2024-01-10',
    status: 'Active',
    paymentStatus: 'Paid'
  },
  {
    id: '2',
    studentId: '1',
    studentName: 'Alice Johnson',
    classId: '3',
    className: 'IELTS Intensive',
    enrollmentDate: '2024-02-28',
    status: 'Active',
    paymentStatus: 'Paid'
  },
  {
    id: '3',
    studentId: '2',
    studentName: 'Bob Smith',
    classId: '2',
    className: 'Business English Pro',
    enrollmentDate: '2024-01-28',
    status: 'Active',
    paymentStatus: 'Pending'
  },
  {
    id: '4',
    studentId: '3',
    studentName: 'Carol Davis',
    classId: '1',
    className: 'General English A1',
    enrollmentDate: '2024-01-12',
    status: 'Active',
    paymentStatus: 'Paid'
  },
  {
    id: '5',
    studentId: '3',
    studentName: 'Carol Davis',
    classId: '4',
    className: 'Conversation Club',
    enrollmentDate: '2024-01-18',
    status: 'Active',
    paymentStatus: 'Paid'
  },
  {
    id: '6',
    studentId: '4',
    studentName: 'David Wilson',
    classId: '4',
    className: 'Conversation Club',
    enrollmentDate: '2024-01-19',
    status: 'Active',
    paymentStatus: 'Overdue'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@lcms.edu',
    role: 'Admin',
    profileId: 'admin1',
    profileName: 'System Administrator'
  },
  {
    id: '2',
    email: 'sarah.mitchell@lcms.edu',
    role: 'Teacher',
    profileId: '1',
    profileName: 'Dr. Sarah Mitchell'
  },
  {
    id: '3',
    email: 'james.rodriguez@lcms.edu',
    role: 'Teacher',
    profileId: '2',
    profileName: 'James Rodriguez'
  },
  {
    id: '4',
    email: 'alice.johnson@email.com',
    role: 'Student',
    profileId: '1',
    profileName: 'Alice Johnson'
  }
];

export const dashboardStats = {
  totalStudents: mockStudents.length,
  activeClasses: mockClasses.filter(c => new Date(c.endDate) > new Date()).length,
  totalRevenue: mockEnrollments
    .filter(e => e.paymentStatus === 'Paid')
    .reduce((sum, e) => {
      const course = mockCourses.find(c => 
        mockClasses.find(cl => cl.id === e.classId)?.courseId === c.id
      );
      return sum + (course?.fee || 0);
    }, 0),
  pendingPayments: mockEnrollments.filter(e => e.paymentStatus === 'Pending' || e.paymentStatus === 'Overdue').length
};