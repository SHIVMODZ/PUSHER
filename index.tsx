```tsx
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function AdminPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'MANAGER' });
  const [loading, setLoading] = useState(false);

  if (!session) return <p className="p-6">Loading...</p>;
  if ((session.user as any).role !== 'ADMIN') return <p className="p-6">Not allowed</p>;

  async function createUser(e: any) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setLoading(false);
    if (!res.ok) {
      const text = await res.text();
      alert('Error: ' + text);
    } else {
      alert('User created');
      setForm({ email: '', password: '', name: '', role: 'MANAGER' });
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-8">
      <div className="w-full max-w-lg bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
        <form onSubmit={createUser} className="space-y-3">
          <input required placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="w-full p-2 border rounded" />
          <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full p-2 border rounded" />
          <input required placeholder="Password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} className="w-full p-2 border rounded" />
          <select value={form.role} onChange={e=>setForm({...form, role: e.target.value})} className="w-full p-2 border rounded">
            <option>OWNER</option>
            <option>MANAGER</option>
            <option>ADMIN</option>
            <option>MEMBER</option>
          </select>
          <div>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
              {loading ? 'Creating...' : 'Create user'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```