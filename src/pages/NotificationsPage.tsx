import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Notification = {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
};

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("medpal_token");
        const res = await axios.get(`${API_BASE_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch {
        toast.error("Failed to load notifications");
      }
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem("medpal_token");
      await axios.put(
        `${API_BASE_URL}/api/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  if (loading) return <div className="p-4">Loading notifications...</div>;
  if (!notifications.length) return <div className="p-4">No notifications found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Notifications</h1>
      <div className="w-full max-w-2xl space-y-4">
        {notifications.map((n) => (
          <div
            key={n._id}
            className={`flex justify-between items-center p-4 rounded shadow ${
              n.read ? "bg-gray-100" : "bg-blue-50"
            }`}
          >
            <div>
              <div className={`font-semibold ${n.read ? "text-gray-500" : "text-blue-700"}`}>
                {n.message}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
            {!n.read && (
              <button
                onClick={() => markAsRead(n._id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Mark as read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
