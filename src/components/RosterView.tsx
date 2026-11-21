import React, { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { STAFF, TeamId, getTeamColorClasses } from '../data/dvkhData';
import { PersonLink } from './PersonLink';

interface RosterViewProps {
  selectedId: string | null;
  onSelectPerson: (id: string) => void;
}

type TeamFilter = 'all' | TeamId;
type RoleFilter = 'all' | 'lead' | 'special';

export const RosterView: React.FC<RosterViewProps> = ({ selectedId, onSelectPerson }) => {
  const [query, setQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState<TeamFilter>('all');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STAFF.filter((p) => {
      if (teamFilter !== 'all' && p.team !== teamFilter) return false;
      if (roleFilter === 'lead' && !p.lead && p.role !== 'Kiểm soát viên') return false;
      if (roleFilter === 'special' && !p.quyhoach && !p.tag) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.u.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        (p.tag && p.tag.toLowerCase().includes(q))
      );
    });
  }, [query, teamFilter, roleFilter]);

  const resetFilters = () => {
    setQuery('');
    setTeamFilter('all');
    setRoleFilter('all');
  };

  return (
    <div className="space-y-6">
      <section className="max-w-3xl space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
          Danh sách cán bộ Phòng DVKH
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Danh sách cập nhật tháng 11/2026 gồm 18 cán bộ. Số thứ tự được đánh liên tục theo từng team sau khi Nguyễn Hoài
          Anh nghỉ việc.
        </p>
      </section>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5">
        <div className="relative flex-1 min-w-0">
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo họ tên, user hoặc chức danh..."
            aria-label="Tìm kiếm cán bộ"
            className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Xóa từ khóa tìm kiếm"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label="Lọc theo team"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg"
          >
            {(
              [
                { key: 'all', label: 'Tất cả' },
                { key: 1, label: 'Team 1' },
                { key: 2, label: 'Team 2' },
                { key: 3, label: 'Team 3' },
              ] as const
            ).map((t) => (
              <button
                key={String(t.key)}
                type="button"
                onClick={() => setTeamFilter(t.key)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  teamFilter === t.key
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div
            role="group"
            aria-label="Lọc theo nhóm vai trò"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg"
          >
            {(
              [
                { key: 'all', label: 'Mọi chức danh' },
                { key: 'lead', label: 'Lãnh đạo / KSV' },
                { key: 'special', label: 'Đầu mối & Quy hoạch' },
              ] as const
            ).map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setRoleFilter(r.key)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  roleFilter === r.key
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 px-6 text-center space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Không tìm thấy cán bộ nào phù hợp với bộ lọc hiện tại.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[740px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 px-4 w-14 text-center">STT</th>
                  <th className="py-2.5 px-4">Họ và tên</th>
                  <th className="py-2.5 px-4">User</th>
                  <th className="py-2.5 px-4">Team</th>
                  <th className="py-2.5 px-4">Chức danh & Vai trò</th>
                  <th className="py-2.5 px-4 text-right">Đầu việc</th>
                  <th className="py-2.5 px-4 text-right">RM phối hợp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filtered.map((p) => {
                  const colors = getTeamColorClasses(p.team);
                  const isActive = selectedId === p.id;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => onSelectPerson(p.id)}
                      className={`cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-blue-50/60 dark:bg-blue-950/30'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <td className="py-2.5 px-4 text-center font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                        {p.stt}
                      </td>
                      <td className={`py-2.5 px-4 ${p.lead ? 'font-semibold' : 'font-medium'}`}>
                        <PersonLink id={p.id} selectedId={selectedId} onSelect={onSelectPerson} />
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">{p.u}</td>
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <span className={`text-xs font-semibold ${colors.text}`}>Team {p.team}</span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300">
                        <span>{p.role}</span>
                        {p.tag && (
                          <span className="text-xs text-slate-500 dark:text-slate-400"> · {p.tag}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-xs text-slate-600 dark:text-slate-300 tabular-nums">
                        {p.tasks.length > 0 ? p.tasks.length : '—'}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-xs text-slate-600 dark:text-slate-300 tabular-nums">
                        {p.rm ? p.rm.length : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
