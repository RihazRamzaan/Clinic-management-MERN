import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import api from '../api';

const PatientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Male',
        contact: '',
        address: '',
        medicalHistory: '',
    });

    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            const fetchPatient = async () => {
                try {
                    const { data } = await api.get(`/patients/${id}`);
                    setFormData({
                        name: data.name,
                        age: data.age,
                        gender: data.gender,
                        contact: data.contact,
                        address: data.address,
                        medicalHistory: data.medicalHistory || '',
                    });
                } catch (err) {
                    setError('Failed to fetch patient data.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchPatient();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await api.put(`/patients/${id}`, formData);
            } else {
                await api.post('/patients', formData);
            }
            navigate('/patients');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong while saving.');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/patients" className="text-slate-400 hover:text-slate-600 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold text-slate-800">
                    {isEditMode ? 'Edit Patient Record' : 'New Patient Record'}
                </h1>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Age</label>
                            <input
                                type="number"
                                name="age"
                                required
                                min="0"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                                placeholder="30"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 bg-white"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Contact Number</label>
                            <input
                                type="text"
                                name="contact"
                                required
                                value={formData.contact}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                                placeholder="+1 234 567 8900"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                                placeholder="123 Medical Way, City"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-700">Medical History (Optional)</label>
                            <textarea
                                name="medicalHistory"
                                rows="4"
                                value={formData.medicalHistory}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 resize-y"
                                placeholder="Any known allergies, past surgeries, or chronic conditions..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end gap-3">
                    <Link
                        to="/patients"
                        className="px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
                    >
                        <Save size={18} />
                        {isEditMode ? 'Update Record' : 'Save Record'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;
