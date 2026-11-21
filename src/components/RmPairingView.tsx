import React, { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { STAFF, TeamId, getTeamColorClasses } from '../data/dvkhData';
import { PersonLink } from './PersonLink';

interface RmPairingViewProps {
  selectedId: string | null;
  onSelectPerson: (id: string) => void;
}

type TeamFilter = 'all' | 2 | 3;

const RM_DEPARTMENTS = ['Tất cả phòng RM', 'Phòng Bán lẻ', 'Phòng KHDN Lớn', 'Phòng KHDN Vừa & Nhỏ'] as const;

export const RmPairingView: React.FC<RmPairingViewProps> = ({ selectedId, onSelectPerson }) => {
  const [query, setQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState<TeamFilter>('all');
  const [deptFilter, setDeptFilter] = useState<string>('Tất cả phòng RM');

  const tellers = useMemo(() => STAFF.filter((p) => p.role === 'Giao dịch viên'), []);

  const filteredTellers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tellers
      .filter((t) => (teamFilter === 'all' ? true : t.team === teamFilter))
      .map((t) => {
        const rms = t.rm || [];
        const matchingRms = rms.filter(([rmName, rmRole, rmDept]) => {
          if (deptFilter !== 'Tất cả phòng RM' && rmDept !== deptFilter) return false;
          if (!q) return true;
          return (
            t.name.toLowerCase().includes(q) ||
            t.u.toLowerCase().includes(q) ||
            rmName.toLowerCase().includes(q) ||
            rmRole.toLowerCase().includes(q) ||
            rmDept.toLowerCase().includes(q)
          );
        });
        const tellerMatchesSelf =
          deptFilter === 'Tất cả phòng RM' &&
          (!q || t.name.toLowerCase().includes(q) || t.u.toLowerCase().includes(q));
        return {
          teller: t,
          visibleRms: matchingRms,
          keep: matchingRms.length > 0 || tellerMatchesSelf,
        };
      })
      .filter((entry) => entry.keep);
  }, [tellers, query, teamFilter, deptFilter]);

  const totalVisibleRms = filteredTellers.reduce((acc, e) => acc + e.visibleRms.length, 0);

  const resetFilters = () => {
    setQuery('');
    setTeamFilter('all');
    setDeptFilter('Tất cả phòng RM');
  };

  return (
    <div className="space-y-6">
      <section className="max-w-3xl space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
          Giao dịch viên phối hợp RM
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Theo bảng ghép cặp GDV – RM ngày 02/06. Giao dịch viên thực hiện toàn bộ giao dịch cho khách hàng cá nhân và
          doanh nghiệp của RM được ghép cặp; khi RM luân chuyển, GDV tiếp tục phụ trách RM thay thế.
        </p>
      </section>

      {/* Filter Bar */}
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
            placeholder="Tìm theo tên GDV, tên RM hoặc phòng RM (VD: KHDN Lớn, SSO, FDI)..."
            aria-label="Tìm kiếm ghép cặp GDV và RM"
            className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Xóa tìm kiếm"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label="Lọc theo team GDV"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg"
          >
            {(
              [
                { key: 'all', label: 'Tất cả' },
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

          <select
            aria-label="Lọc theo phòng RM"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            {RM_DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pairing Table */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        {filteredTellers.length === 0 ? (
          <div className="py-12 px-6 text-center space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Không tìm thấy cặp GDV – RM nào khớp với từ khóa tìm kiếm.
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
            <table className="w-full min-w-[680px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 px-4 w-56">Giao dịch viên</th>
                  <th className="py-2.5 px-4 w-28">Team</th>
                  <th className="py-2.5 px-4">RM phối hợp</th>
                  <th className="py-2.5 px-4 w-24 text-right">Số RM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredTellers.map(({ teller, visibleRms }) => {
                  const colors = getTeamColorClasses(teller.team as TeamId);
                  return (
                    <tr
                      key={teller.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors align-top"
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold">
                          <PersonLink id={teller.id} selectedId={selectedId} onSelect={onSelectPerson} />
                        </div>
                        <div className="mt-0.5 font-mono text-xs text-slate-500 dark:text-slate-400">{teller.u}</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`text-xs font-semibold ${colors.text}`}>Team {teller.team}</span>
                      </td>
                      <td className="py-3 px-4">
                        {visibleRms.length > 0 ? (
                          <ul className="space-y-1.5">
                            {visibleRms.map(([rmName, rmRole, rmDept], idx) => (
                              <li key={idx} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                                <span className="font-medium text-slate-900 dark:text-slate-100">{rmName}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {rmRole} · {rmDept}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Chưa có trong bảng ghép cặp ngày 02/06, cần bổ sung
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-sm font-semibold text-slate-700 dark:text-slate-200 tabular-nums">
                        {visibleRms.length}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <td className="py-2.5 px-4" colSpan={3}>
                    Tổng số giao dịch viên hiển thị: {filteredTellers.length}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono tabular-nums">{totalVisibleRms}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
