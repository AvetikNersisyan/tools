import React, { useState, useEffect } from 'react';
import { leadsStorage, getAllStorageData, clearAllData } from '../utils/storage';
import { exportLeadsAsCsv } from '../utils/csv';
import { formatDateTime } from '../utils/time';
import type { Lead } from '../types';

/**
 * AdminPanel component for development mode only
 */
export const AdminPanel: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  // Only render in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  useEffect(() => {
    const loadLeads = () => {
      const allLeads = leadsStorage.getArray();
      setLeads(allLeads);
    };

    loadLeads();
    
    // Refresh leads every 5 seconds in case new ones are added
    const interval = setInterval(loadLeads, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleExportCsv = () => {
    if (leads.length === 0) {
      alert('No leads to export');
      return;
    }

    exportLeadsAsCsv(leads);
    
    if (window.trackEvent) {
      window.trackEvent('admin_csv_export', {
        leads_count: leads.length,
      });
    }
  };

  const handleClearLeads = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }

    clearAllData();
    setLeads([]);
    setConfirmClear(false);

    if (window.trackEvent) {
      window.trackEvent('admin_data_cleared', {
        leads_count: leads.length,
      });
    }

    alert('All data cleared successfully');
  };

  const handleViewStorage = () => {
    const data = getAllStorageData();
    console.log('All Storage Data:', data);
    alert('Storage data logged to console (F12 to view)');
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-gray-800 text-white px-3 py-2 rounded-lg text-xs font-mono hover:bg-gray-700 transition-colors"
          title="Open Admin Panel (Dev Mode)"
        >
          [Կազմիչ] Սպասավոր
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">Սպասավորական պանել</h2>
            <p className="text-sm text-gray-300">Միայն մշակումային ռեժիմում</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-300 hover:text-white text-xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-primary-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary-600">{leads.length}</div>
              <div className="text-sm text-primary-700">Ամբողջ հայտարարություններ</div>
            </div>
            
            <div className="bg-success-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-success-600">
                {leads.filter(lead => new Date(lead.created_at).getTime() > Date.now() - 24 * 60 * 60 * 1000).length}
              </div>
              <div className="text-sm text-success-700">Վերջին 24ը</div>
            </div>
            
            <div className="bg-warning-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-warning-600">
                {leads.filter(lead => lead.preferred_contact === 'whatsapp').length}
              </div>
              <div className="text-sm text-warning-700">WhatsApp</div>
            </div>
            
            <div className="bg-secondary-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-secondary-600">
                {leads.filter(lead => lead.email).length}
              </div>
              <div className="text-sm text-secondary-700">With Email</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={handleExportCsv}
              disabled={leads.length === 0}
              className="btn btn-primary btn-sm"
            >
              📥 Export CSV ({leads.length})
            </button>
            
            <button
              onClick={handleViewStorage}
              className="btn btn-secondary btn-sm"
            >
              🔍 View Storage Data
            </button>
            
            <button
              onClick={handleClearLeads}
              className={`btn btn-sm ${confirmClear ? 'bg-error-600 text-white hover:bg-error-700' : 'btn-ghost text-error-600 border-error-600'}`}
            >
              {confirmClear ? '⚠️ Confirm Clear All' : '🗑️ Clear All Data'}
            </button>

            {confirmClear && (
              <button
                onClick={() => setConfirmClear(false)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Leads table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 className="font-semibold">Recent Leads</h3>
            </div>

            {leads.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <div className="text-4xl mb-4">📋</div>
                <p>No leads captured yet</p>
                <p className="text-sm">Leads will appear here when users submit the contact form</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Phone</th>
                      <th className="text-left p-3 font-medium">Email</th>
                      <th className="text-left p-3 font-medium">Contact</th>
                      <th className="text-left p-3 font-medium">Created</th>
                      <th className="text-left p-3 font-medium">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads
                      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .slice(0, 50) // Limit to last 50 for performance
                      .map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{lead.name}</td>
                        <td className="p-3 font-mono text-xs">{lead.phone}</td>
                        <td className="p-3 text-xs">{lead.email || '—'}</td>
                        <td className="p-3">
                          <span className={`badge text-xs ${
                            lead.preferred_contact === 'whatsapp' ? 'badge-success' :
                            lead.preferred_contact === 'telegram' ? 'badge-primary' :
                            'badge-secondary'
                          }`}>
                            {lead.preferred_contact}
                          </span>
                        </td>
                        <td className="p-3 text-xs text-gray-500">
                          {formatDateTime(lead.created_at)}
                        </td>
                        <td className="p-3 text-xs max-w-xs truncate" title={lead.note}>
                          {lead.note || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {leads.length > 50 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Showing latest 50 leads. Export CSV for complete data.
            </div>
          )}

          {/* Debug info */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Debug Info</h4>
            <div className="text-xs text-gray-600 space-y-1 font-mono">
              <div>Environment: {process.env.NODE_ENV || 'development'}</div>
              <div>Timestamp: {new Date().toISOString()}</div>
              <div>localStorage Keys: leads, comments, countdown-start, stock-state</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};