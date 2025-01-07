import React, { useState, useCallback, memo, useMemo } from 'react';
import { Calendar, Check, X, ChevronDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const STORAGE_KEY = 'attendance_records';
const GROUPS = {
    'Group 1': [...new Set([
      'isaacsentongo33@gmail.com',
      'paythontimba@gmail.com',
      'maserekaronald1996@gmail.com',
      'sbazibu679@gmail.com',
      'parioalex45@gmail.com',
      'akoyesiga@gmail.com',
      'mwanjeyovan@gmail.com',
      'lil.benjer@gmail.com',
      'mulerewilson@gmail.com',
      'mataisaac277@gmail.com',
      'josephmukama67@gmail.com',
      'britechugandaltd@gmail.com',
      'kasiitaivan01@gmail.com',
      'talemwabrian3@gmail.com',
      'brimhenry@gmail.com',
      'kigozi672@gmail.com',
      'innocentomiga@gmail.com',
      'robertmatsiko5@gmail.com',
      'patrickigozi2002@gmail.com',
      'euniceankunda06@gmail.com',
      'yananmahad18@gmail.com',
      'nluckieprecious@gmail.com',
      'joshuankinga@gmail.com',
      'amootipeter3@gmail.com',
      'amulinuwagaba9@gmail.com',
      'chirigaisaacos@gmail.com',
    
    ])],
    'Group 2': [...new Set([
      'hosea6647@gmail.com',
      'hydn.richardsonic@gmail.com',
      'katwaaloeric2@gmail.com',
      'sufsane1@gmail.com',
      'juliuskibs69@gmail.com',
      'isabiryemicheal8@gmail.com',
      'nakashamielean@gmail.com',
      'twesiimejim8@gmail.com',
      'nabaggalalindah@gmail.com',
      'banalyaimran925@gmail.com',
      'nahabwe.emmanuel1@gmail.com',
      'pamelavic810@gmail.com',
      'fredamutuhire@gmail.com',
      'turyomurugyedomoses@gmail.com',
      'matsikojustusjusto1997@gmail.com',
      'ibrakisekka29@gmail.com',
      'leticianamagala018@gmail.com',
      'mateyafred55@gmail.com',
      'nakitendeshakirah535@gmail.com',
      'azizdarion@gmail.com',
      'nasasiraelizabeth0@gmail.com',
      'johnboscolongom8@gmail.com',
      'ronnieisabirye90@gmail.com',
      'brianmaloba001@gmail.com',
      'wakabimeddy6@gmail.com',
      'bukenyamuhamadi121@gmail.com',
      'ecaepascal2019@gmail.com',
      'asiimwejoseph1199@gmail.com',
      'wambiemmanuel1993@gmail.com',
      'anitiemmanuel3@gmail.com',
      'cnahamya@gmail.com',
      'barakajoe5@gmail.com',
      'allanamutwendeize7@gmail.com',
      'tonnyanara@gmail.com',
      'okiriamartin903@gmail.com',
      'johansasonyet076@gmail.com',
      'wagabafrank36@gmail.com',
      'karimtenywa@gmail.com',
      'abikudaking@gmail.com',
      'ogeorgemorris@gmail.com',
      'katuramudidas7@gmail.com',
      'kiryaj511@gmail.com',
      'master.kdata@gmail.com',
      'kyamulamiraregan27@gmail.com',
      'simonpeterekut3@gmail.com',
      'kusinguratyson4@gmail.com',
      'backrijohnny@gmail.com',
      'mosesssemwanga3@gmail.com',
      'atoronyangjohn2020@gmail.com',
      'abutufairi1@gmail.com',
    ])],
    'Group 3': [...new Set([
      'kugonzaseemu@gmail.com',
    'amutuhairegilbert7@gmail.com',
    'susannenambi1@gmail.com',
    'danielakilimali06@gmail.com',
    'madrineasaba@gmail.com',
    'moonyango2013@gmail.com',
    'akastylez22@gmail.com',
    'tumwesigyesamuel52@gmail.com',
    'wonabadivincent@gmail.com',
    'ssemugeraroger@gmail.com',
    'dengelijah30@gmail.com',
    'ciildareencxakiim@gmail.com',
    'janixcharz@gmail.com',
    'a.coulibaly4604@gmail.com',
    'nakindinda@gmail.com',
    'victornshabaruhanga@gmail.com',
    'rogersabigabaateenyi87@gmail.com',
    'kinensamuel1@gmail.com',
    'abigailpsalmist360@gmail.com',
    'balindabellbrian5@gmail.com',
    'ramathanreigns@gmail.com',
    'yonakamabu123@gmail.com',
    'cjkirsie@gmail.com',
    'innocentakenda@gmail.com',
    'lawtonny725@gmail.com',
    'manirahariaggrey@gmail.com',
    'tusubirab29@gmail.com',
    'kjockim36@gmail.com',
    'cratipher@gmail.com',
    'immynamu@gmail.com',
    'mutegekirobert47@gmail.com',
    'sumayyahmutyaba701@gmail.com',
    'sinzayigayavallenceh@gmail.com',
    'ponsubuga@gmail.com',
    'bettynagawa021@gmail.com',
    'ambrosemusinguzi344@gmail.com',
    'nicholaswapaile2021@gmail.com',
    'morishokao4@gmail.com',
    'ayikobuaphilliam657@gmail.com',
    'okirups@gmail.com',
    'mugerry@gmail.com',
    'muhumuzamajidu149@gmail.com',
    'kanyesigyestuart423@gmail.com',
    'kyamaggwasamuel5@gmail.com',
    'muwanikaomaar5@gmail.com',
    'sserikarogers14@gmail.com',
    'millanxandrie@gmail.com',
    'kamagagpm1980@gmail.com',
    'emmlyessyheavenz@gmail.com',
    'muwugo@gmail.com',
    ])],
    'Group 4': [...new Set([
      'chrispuskamanyire@gmail.com',
      'tukashabadavis6@gmail.com',
      'agabad347@gmail.com',
      'sherrycent21@gmail.com',
      'kyomugisabetty62@gmail.com',
      'rhojaztush@gmail.com',
      'isaka1983@gmail.com',
      'ssnakurut@gmail.com',
      'jemanabaccwa@gmail.com',
      'savioursitaku89@gmail.com',
      'namanyaspencerk@gmail.com',
      'nabulimeannet91@gmail.com',
      'karlkarx@gmail.com',
      'lekugerald306@gmail.com',
      'bonifestinho2@gmail.com',
      'mugenyijsimon@gmail.com',
      'sserwaddakhenry@gmail.com',
      'wejulirobert70@gmail.com',
      'atwijukadouglas@gmail.com',
      'augustineeboku@gmail.com',
      'osboni986@gmail.com',
      'gideonbuhes@gmail.com',
      'hakizimanalawrence12@gmail.com',
      'juniorkawe246@gmail.com',
      'mr.encrypted123@gmail.com',
      'wagubia@gmail.com',
      'ojeramichael1@gmail.com',
      'goldenchildprimaryschool41@gmail.com',
      'barbaraakello13@gmail.com',
      'ayerdariousfavoured@gmail.com',
      'davidclaudius04@gmail.com',
      'mukagajoseph022@gmail.com',
      'ronaldorikiriza6@gmail.com',
      'kyeyunebashir15@gmail.com',
      'nimusiimagideon2019@gmail.com',
      'kamezirerobert@gmail.com',
      'paddymayinja8@gmail.com',
      'pashamugenyi@gmail.com',
      'philemonsamsono@gmail.com',
      'ochengabriel837@gmail.com'
    ])]
  };

  const loadAttendanceFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Error loading attendance from storage:', error);
      return {};
    }
  };
  
  const saveAttendanceToStorage = (attendance) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance));
    } catch (error) {
      console.error('Error saving attendance to storage:', error);
    }
  };
  
  const DateSelector = memo(({ selectedDate, onDateChange }) => {
    return (
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={onDateChange}
          className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </div>
    );
  });
  
  const GroupSelector = memo(({ selectedGroup, onGroupChange, groups }) => {
    return (
      <div className="relative w-full sm:w-auto">
        <select
          value={selectedGroup}
          onChange={(e) => onGroupChange(e.target.value)}
          className="w-full sm:w-auto appearance-none px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="">Select Group</option>
          {Object.keys(groups).map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
      </div>
    );
  });
  
  const AttendanceButton = memo(({ onClick, isActive, type }) => {
    const Icon = type === 'present' ? Check : X;
    const styles = {
      present: {
        active: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
        default: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
      },
      absent: {
        active: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
        default: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
      }
    };
    
    return (
      <button
        onClick={onClick}
        className={`p-2 sm:p-1 rounded-full transition-colors ${isActive ? styles[type].active : styles[type].default}`}
      >
        <Icon className="h-6 w-6 sm:h-4 sm:w-4" />
      </button>
    );
  });
  
  const StudentCell = memo(({ student, date, attendance, onAttendanceChange }) => {
    const dateKey = date.toISOString().split('T')[0];
    const status = attendance[dateKey]?.[student["Email Address"]];
  
    const handlePresent = useCallback(() => {
      onAttendanceChange(student["Email Address"], date, 'present');
    }, [student, date, onAttendanceChange]);
  
    const handleAbsent = useCallback(() => {
      onAttendanceChange(student["Email Address"], date, 'absent');
    }, [student, date, onAttendanceChange]);
  
    return (
      <div className="flex justify-center space-x-2">
        <AttendanceButton
          type="present"
          isActive={status === 'present'}
          onClick={handlePresent}
        />
        <AttendanceButton
          type="absent"
          isActive={status === 'absent'}
          onClick={handleAbsent}
        />
      </div>
    );
  });
  
  const StudentRow = memo(({ student, date, attendance, onAttendanceChange }) => {
    const studentName = useMemo(() => {
      return student["Full Name"].toUpperCase();
    }, [student["Full Name"]]);
  
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 space-y-2 sm:space-y-0">
        <span className="font-medium text-gray-900 dark:text-gray-100 text-center sm:text-left break-all sm:break-normal">
          {studentName}
        </span>
        <StudentCell
          student={student}
          date={date}
          attendance={attendance}
          onAttendanceChange={onAttendanceChange}
        />
      </div>
    );
  });
  
  const GroupedAttendanceComponent = ({ students }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGroup, setSelectedGroup] = useState('');
  const [attendance, setAttendance] = useState(() => loadAttendanceFromStorage());
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredStudents = useMemo(() => {
    if (!selectedGroup) return [];
    const groupEmails = GROUPS[selectedGroup];
    return students.filter(student => groupEmails.includes(student["Email Address"]));
  }, [students, selectedGroup]);

  const handleDateChange = useCallback((e) => {
    const newDate = new Date(e.target.value);
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
    setSelectedDate(newDate);
  }, []);

  const handleAttendanceChange = useCallback((studentId, date, status) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    
    requestAnimationFrame(() => {
      setAttendance(prev => {
        const dateKey = date.toISOString().split('T')[0];
        const newAttendance = {
          ...prev,
          [dateKey]: {
            ...prev[dateKey],
            [studentId]: status
          }
        };
        saveAttendanceToStorage(newAttendance);
        return newAttendance;
      });
      
      setIsUpdating(false);
    });
  }, [isUpdating]);

  // Move groupSummary calculation before handleExport
  const groupSummary = useMemo(() => {
    if (!selectedGroup || !filteredStudents.length) return {
      total: 0,
      present: 0,
      absent: 0,
      unmarked: 0
    };
    
    const dateKey = selectedDate.toISOString().split('T')[0];
    const dayAttendance = attendance[dateKey] || {};
    
    const present = filteredStudents.filter(s => 
      dayAttendance[s["Email Address"]] === 'present'
    ).length;
    
    const absent = filteredStudents.filter(s => 
      dayAttendance[s["Email Address"]] === 'absent'
    ).length;
    
    return {
      total: filteredStudents.length,
      present,
      absent,
      unmarked: filteredStudents.length - present - absent
    };
  }, [selectedGroup, filteredStudents, attendance, selectedDate]);

  const handleExport = useCallback((format) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const dayAttendance = attendance[dateKey] || {};
    
    const exportData = filteredStudents.map(student => ({
      Name: student['Full Name'].toUpperCase(),
      Email: student['Email Address'],
      Status: dayAttendance[student['Email Address']] || 'unmarked',
      Date: dateKey
    }));

    switch (format) {
      case 'csv':
        const csvContent = [
          ['Name', 'Email', 'Status', 'Date'],
          ...exportData.map(row => [
            row.Name,
            row.Email,
            row.Status,
            row.Date
          ])
        ].map(row => row.join(',')).join('\n');

        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        const csvUrl = window.URL.createObjectURL(csvBlob);
        const csvLink = document.createElement('a');
        csvLink.href = csvUrl;
        csvLink.download = `attendance_${selectedGroup}_${dateKey}.csv`;
        csvLink.click();
        window.URL.revokeObjectURL(csvUrl);
        break;

      case 'xlsx':
        const wb = XLSX.utils.book_new();
        
        const summaryData = [
          ['Attendance Summary'],
          ['Group', selectedGroup],
          ['Date', dateKey],
          ['Total Students', groupSummary.total],
          ['Present', groupSummary.present],
          ['Absent', groupSummary.absent],
          ['Unmarked', groupSummary.unmarked],
          [],
          ['Detailed Attendance'],
          ['Name', 'Email', 'Status', 'Date'],
          ...exportData.map(row => [
            row.Name,
            row.Email,
            row.Status,
            row.Date
          ])
        ];
        
        const ws = XLSX.utils.aoa_to_sheet(summaryData);
        
        ws['!cols'] = [
          { wch: 30 },
          { wch: 40 },
          { wch: 15 },
          { wch: 15 }
        ];
        
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
        XLSX.writeFile(wb, `attendance_${selectedGroup}_${dateKey}.xlsx`);
        break;

      case 'json':
        const jsonContent = JSON.stringify({
          summary: groupSummary,
          date: dateKey,
          group: selectedGroup,
          attendance: exportData
        }, null, 2);
        
        const jsonBlob = new Blob([jsonContent], { type: 'application/json' });
        const jsonUrl = window.URL.createObjectURL(jsonBlob);
        const jsonLink = document.createElement('a');
        jsonLink.href = jsonUrl;
        jsonLink.download = `attendance_${selectedGroup}_${dateKey}.json`;
        jsonLink.click();
        window.URL.revokeObjectURL(jsonUrl);
        break;

      case 'pdf':
        const doc = new jsPDF();
        
        doc.setFontSize(16);
        doc.text(`AWB Attendance Report - ${selectedGroup}`, 14, 15);
        
        doc.setFontSize(12);
        doc.text(`Date: ${dateKey}`, 14, 25);
        
        doc.setFontSize(14);
        doc.text('Summary', 14, 35);
        
        const summaryTable = [
          ['Total', 'Present', 'Absent', 'Unmarked'],
          [
            groupSummary.total.toString(),
            groupSummary.present.toString(),
            groupSummary.absent.toString(),
            groupSummary.unmarked.toString()
          ]
        ];
        
        doc.autoTable({
          startY: 40,
          head: [summaryTable[0]],
          body: [summaryTable[1]],
          theme: 'grid',
          headStyles: { fillColor: [66, 139, 202] }
        });
        
        doc.setFontSize(14);
        doc.text('Detailed Attendance', 14, doc.lastAutoTable.finalY + 15);
        
        const detailedTable = [
          ['Name', 'Email', 'Status'],
          ...exportData.map(row => [row.Name, row.Email, row.Status])
        ];
        
        doc.autoTable({
          startY: doc.lastAutoTable.finalY + 20,
          head: [detailedTable[0]],
          body: detailedTable.slice(1),
          theme: 'grid',
          headStyles: { fillColor: [66, 139, 202] },
          columnStyles: {
            0: { cellWidth: 50 },
            1: { cellWidth: 80 },
            2: { cellWidth: 30 }
          }
        });
        
        doc.save(`attendance_${selectedGroup}_${dateKey}.pdf`);
        break;

      default:
        console.error('Unsupported export format:', format);
    }
  }, [selectedDate, attendance, filteredStudents, selectedGroup, groupSummary]);

  const handleClearAttendance = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all attendance records? This cannot be undone.')) {
      setAttendance({});
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 sm:p-4 md:p-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center sm:text-left">
            Group Attendance
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <GroupSelector
              selectedGroup={selectedGroup}
              onGroupChange={setSelectedGroup}
              groups={GROUPS}
            />
            <DateSelector
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
          </div>
        </div>
        
        {groupSummary && (
          <>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total</div>
                <div className="font-bold text-gray-900 dark:text-gray-100">{groupSummary.total}</div>
              </div>
              <div className="text-center p-2 bg-green-100 dark:bg-green-900 rounded">
                <div className="text-xs sm:text-sm text-green-600 dark:text-green-400">Present</div>
                <div className="font-bold text-green-700 dark:text-green-300">{groupSummary.present}</div>
              </div>
              <div className="text-center p-2 bg-red-100 dark:bg-red-900 rounded">
                <div className="text-xs sm:text-sm text-red-600 dark:text-red-400">Absent</div>
                <div className="font-bold text-red-700 dark:text-red-300">{groupSummary.absent}</div>
              </div>
              <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Unmarked</div>
                <div className="font-bold text-gray-900 dark:text-gray-100">{groupSummary.unmarked}</div>
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
              <div className="relative w-full sm:w-auto">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleExport(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  value=""
                  className="w-full sm:w-auto px-3 py-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors appearance-none pr-8"
                >
                  <option value="" disabled>Export As...</option>
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel</option>
                  <option value="json">JSON</option>
                  <option value="pdf">PDF</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600 dark:text-blue-300 pointer-events-none" />
              </div>
              <button
                onClick={handleClearAttendance}
                className="w-full sm:w-auto px-3 py-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                Clear All
              </button>
            </div>
          </>
        )}
      </div>

      <div className="p-2 sm:p-4 md:p-6">
        {!selectedGroup ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            Please select a group to take attendance
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-4">
            {filteredStudents.map((student) => (
              <StudentRow
                key={student["Email Address"]}
                student={student}
                date={selectedDate}
                attendance={attendance}
                onAttendanceChange={handleAttendanceChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(GroupedAttendanceComponent);