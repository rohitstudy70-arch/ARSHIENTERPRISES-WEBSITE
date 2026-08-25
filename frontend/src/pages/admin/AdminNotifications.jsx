import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaBell, FaTrash, FaCheckDouble, FaEnvelope, FaPhone, FaStar, FaCog, FaCheck } from 'react-icons/fa';

const typeConfig = {
  inquiry: { icon: FaEnvelope, gradient: 'from-emerald-500 to-green-600', emoji: '📩' },
  lead: { icon: FaPhone, gradient: 'from-sky-500 to-blue-600', emoji: '📞' },
  testimonial: { icon: FaStar, gradient: 'from-yellow-500 to-orange-500', emoji: '⭐' },
  system: { icon: FaCog, gradient: 'from-slate-500 to-gray-600', emoji: '⚙️' },
};

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getNotifications();
      setNotifications(res.data.data || []);
    } catch {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleMarkAllRead = async () => {
    const unread = notifications.filter(n => !n.isRead).map(n => n._id);
    if (!unread.length) return;
    try {
      await adminAPI.markNotificationsRead(unread);
      toast.success('All marked as read');
      load();
    } catch {
      toast.error('Failed');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await adminAPI.markNotificationsRead([id]);
      load();
    } catch {}
  };

  const handleDelete = async (id) => {
    try {
      await adminAPI.deleteNotification(id);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {unreadCount > 0
              ? <span className="text-sky-400">{unreadCount} unread notification{unreadCount > 1 ? 's' : ''}</span>
              : 'You\'re all caught up!'
            }
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-3 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-sm font-medium rounded-xl transition-all border border-sky-500/20"
          >
            <FaCheckDouble size={12} />
            Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
          <p className="text-xs text-slate-500">Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-800/60 border border-white/[0.06] rounded-2xl">
          <div className="w-20 h-20 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-4">
            <FaBell size={32} className="text-slate-600" />
          </div>
          <p className="text-slate-400 font-medium">No notifications yet</p>
          <p className="text-slate-500 text-sm mt-1">You'll be notified of new leads, inquiries, and more</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map(notif => {
            const config = typeConfig[notif.type] || typeConfig.system;
            const Icon = config.icon;
            return (
              <div
                key={notif._id}
                className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                  notif.isRead
                    ? 'bg-slate-800/40 border-white/[0.04] hover:bg-slate-800/60'
                    : 'bg-sky-500/5 border-sky-500/15 hover:bg-sky-500/8'
                }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <Icon size={14} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <p className={`text-sm font-medium ${notif.isRead ? 'text-slate-400' : 'text-white'}`}>
                      {notif.title || notif.message}
                    </p>
                    {!notif.isRead && (
                      <span className="w-2 h-2 bg-sky-400 rounded-full flex-shrink-0 mt-1.5 animate-pulse" />
                    )}
                  </div>
                  {notif.title && notif.message && (
                    <p className="text-xs text-slate-500 line-clamp-2">{notif.message}</p>
                  )}
                  <p className="text-xs text-slate-600 mt-1">{formatTime(notif.createdAt)}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notif.isRead && (
                    <button
                      onClick={() => handleMarkRead(notif._id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all"
                      title="Mark as read"
                    >
                      <FaCheck size={11} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notif._id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete"
                  >
                    <FaTrash size={11} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
