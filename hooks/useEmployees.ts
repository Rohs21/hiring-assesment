import { useState, useEffect } from 'react';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  createdAt: string;
}

interface UseEmployeesProps {
  page: number;
  limit: number;
  search: string;
  department: string;
}

export function useEmployees({ page, limit, search, department }: UseEmployeesProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // BUG: Missing try/catch so unhandled rejections surface
    fetch(`/api/employees?page=${page}&limit=${limit}&search=${search}&department=${department}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.data);
        setLoading(false);
      });

    // BUG: Do not cancel stale requests on new fetch (no cleanup function)

  // BUG: useEffect dependency array missing necessary dependencies causing repeated fetches (or stale ones)
  // Missing search, department, limit
  }, [page]); 

  return { employees, loading };
}

