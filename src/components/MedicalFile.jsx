import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMedicalFile, updateMedicalFile } from '../states/medicalFileSlice';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MedicalFile = ({ patientId }) => {
  const dispatch = useDispatch();
  const { medicalFile, loading, error } = useSelector((state) => state.medicalFile || {});

  console.log("MedicalFile component - patientId:", patientId);
  console.log("MedicalFile component - medicalFile:", medicalFile);
  console.log("MedicalFile component - loading:", loading);
  console.log("MedicalFile component - error:", error);

  const [newNote, setNewNote] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    if (patientId) {
      dispatch(fetchMedicalFile(patientId));
    }
  }, [dispatch, patientId]);

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleSubmit = () => {
    if (newNote.trim()) {
      dispatch(updateMedicalFile({ patientId, content: newNote }))
        .then((action) => {
          if (updateMedicalFile.fulfilled.match(action)) {
            // Refresh the medical file data after successful update
            dispatch(fetchMedicalFile(patientId));
          }
        });
      setNewNote('');
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  if (loading) return <div>Loading medical file...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!medicalFile) return <div>No medical file found</div>;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out">
      <div
        className="bg-gray-700 text-white p-4 flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h2 className="text-xl font-bold">Medical File</h2>
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {isExpanded && (
        <div className="p-4">
          <div className="flex mb-4 border-b border-gray-600">
            <button
              className={`py-2 px-4 ${activeTab === 'info' ? 'border-b-2 border-primary-6 text-primary-6' : 'text-gray-400'}`}
              onClick={() => setActiveTab('info')}
            >
              Patient Info
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'notes' ? 'border-b-2 border-primary-6 text-primary-6' : 'text-gray-400'}`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
          </div>

          {console.log("see medical file", medicalFile)}

          {activeTab === 'info' && medicalFile?.patientInfo && (
            <div className="space-y-2">
              <InfoItem label="Name" value={`${medicalFile.patientInfo.firstName} ${medicalFile.patientInfo.lastName}`} />
              <InfoItem label="Date of Birth" value={medicalFile.patientInfo.dateOfBirth ? new Date(medicalFile.patientInfo.dateOfBirth).toLocaleDateString() : 'N/A'} />
              <InfoItem label="Gender" value={medicalFile.patientInfo.gender || 'N/A'} />
              <InfoItem label="Phone" value={medicalFile.patientInfo.phone || 'N/A'} />
              <InfoItem label="Email" value={medicalFile.patientInfo.email || 'N/A'} />
              <InfoItem label="Allergies" value={medicalFile.patientInfo.allergies || 'None'} />
              <InfoItem label="Medications" value={medicalFile.patientInfo.medications || 'None'} />
              <InfoItem label="Conditions" value={medicalFile.patientInfo.conditions || 'None'} />
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <div className="mb-4 max-h-40 overflow-y-auto">
                {medicalFile?.notes?.map((note, index) => (
                  <div key={index} className="mb-2 p-2 bg-gray-700 rounded">
                    <p className="text-sm text-gray-300">
                      {new Date(note.date).toLocaleString()} - {note.specialistId.firstName} {note.specialistId.lastName} ({note.specialistId.specialistCategory})
                    </p>
                    <p className="text-white">{note.content}</p>
                  </div>
                ))}
              </div>
              <textarea
                className="w-full h-32 p-2 border rounded resize-none bg-gray-700 text-white border-gray-600"
                value={newNote}
                onChange={handleNoteChange}
                placeholder="Add new note here..."
              ></textarea>
              <button
                className="mt-2 bg-primary-6 text-white px-4 py-2 rounded hover:bg-primary-7 transition-colors"
                onClick={handleSubmit}
              >
                Add Note
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <p className="text-sm">
    <span className="font-semibold text-gray-300">{label}:</span> <span className="text-gray-400">{value}</span>
  </p>
);

export default MedicalFile;