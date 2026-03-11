import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PatientList from './pages/PatientList';
import PatientForm from './pages/PatientForm';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <nav className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              ClinicCare
            </Link>
            <div className="flex gap-4">
              <Link to="/patients" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Patients</Link>
              <Link to="/patients/new" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Add Record</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<PatientList />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/new" element={<PatientForm />} />
            <Route path="/patients/edit/:id" element={<PatientForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
