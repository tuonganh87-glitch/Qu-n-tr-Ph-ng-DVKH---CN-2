import React, { useMemo, useState } from 'react';
import { Search, UserCheck, X } from 'lucide-react';
import { DELEGATION_RULES, STAFF, TASK_GRID, shortName, staffById, staffByUser } from '../data/dvkhData';
import { PersonLink } from './PersonLink';

interface TaskGridViewProps {
  selectedId: string | null;
  onSelectPerson: (id: string) => void;
}

export const TaskGridView: React.FC<TaskGridViewProps> = ({ selectedId, onSelectPerson }) => {
  const [query, setQuery] = useState('');
  const [focusStaffId, setFocusStaffId] = useState<string>('all');
  const [onlyPrimary, setOnlyPrimary] = useState<boolean>(false);

  const focusedStaff = focusStaffId !== 'all' ? staffById[focusStaffId] : null;

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TASK_GRID.map((row, idx) => ({ ...row, index: idx + 1 })).filter((row) => {
      if (focusedStaff) {
        if (onlyPrimary) {
          if (!row.c[0].includes(focusedStaff.u)) return false;
        } else {
          const appears = row.c.some((col) => col.includes(focusedStaff.u));
          if (!appears) return false;
        }
      }
      if (!q) return true;
      if (row.t.toLowerCase().includes(q)) return true;
      return row.c.some((col) =>
        col.some((u) => {
          const person = staffByUser[u];
          return u.toLowerCase().includes(q) || (person && person.name.toLowerCase().includes(q));
        })
      );
    });
  }, [query, focusedStaff, onlyPrimary]);

  const primaryCountForFocused = useMemo(() => {
    if (!focusedStaff) return 0;
    return TASK_GRID.filter((row) => row.c[0].includes(focusedStaff.u)).length;
  }, [focusedStaff]);

  const backupCountForFocused = useMemo(() => {
    if (!focusedStaff) return 0;
    return TASK_GRID.filter((row) => row.c[1].includes(focusedStaff.u) || row.c[2].includes(focusedStaff.u) || row.c[3].includes(focusedStaff.u)).length;
  }, [focusedStaff]);

  const resetAll = () => {
    setQuery('');
    setFocusStaffId('all');
    setOnlyPrimary(false);
  };

  const renderAssignees = (users: string[], colIndex: number) => {
    if (users.length === 0) {
      return <span className="text-slate-300 dark:text-slate-700">—</span>;
    }
    return (
      <div className="flex flex-col gap-1">
        {users.map((u, idx) => {
          const person = staffByUser[u];
          if (!person) return <span key={`${u}-${idx}`}>{u}</span>;
          const isFocusedPerson = focusedStaff && focusedStaff.id === person.id;
          const isBackupSuccessor =
            focusedStaff &&
            colIndex === 1 &&
            TASK_GRID.some((row) => row.c.some((c) => c === users) && row.c[0].includes(focusedStaff.u));

          return (
            <div
              key={`${u}-${idx}`}
              className={
                isFocusedPerson
                  ? 'font-semibold text-blue-700 dark:text-blue-300'
                  : isBackupSuccessor
                    ? 'font-semibold text-amber-700 dark:text-amber-300'
                    : ''
              }
            >
              <PersonLink
                id={person.id}
                label={shortName(person.id)}
                selectedId={selectedId}
                onSelect={onSelectPerson}
                showPlanningTag={false}
              />
              {isBackupSuccessor && (
                <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400"> · Thay thế</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <section className="max-w-3xl space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
          Bảng phân công công việc chi tiết
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Chốt theo bảng phân công công việc DVKH 2026 ngày 05/05/2026. Mỗi đầu việc có cán bộ phụ trách chính và tối đa
          ba cán bộ dự phòng theo thứ tự ưu tiên.
        </p>
      </section>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm tên đầu việc hoặc tên cán bộ..."
              aria-label="Tìm công việc hoặc cán bộ"
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

          <div className="flex flex-wrap items-center gap-2.5">
            <label htmlFor="staff-backup-select" className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Tra cứu theo cán bộ:
            </label>
            <select
              id="staff-backup-select"
              value={focusStaffId}
              onChange={(e) => {
                setFocusStaffId(e.target.value);
                if (e.target.value === 'all') setOnlyPrimary(false);
              }}
              className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              <option value="all">Tất cả cán bộ (24 đầu việc)</option>
              {STAFF.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.u})
                </option>
              ))}
            </select>

            {focusedStaff && (
              <button
                type="button"
                onClick={() => setOnlyPrimary((v) => !v)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  onlyPrimary
                    ? 'bg-blue-700 border-blue-700 text-white'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {onlyPrimary ? 'Đang lọc: Phụ trách chính' : 'Chỉ xem việc làm Chính'}
              </button>
            )}
          </div>
        </div>

        {/* Contextual Backup Summary when a person is selected */}
        {focusedStaff && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
            <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
              <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">{focusedStaff.name}</span>
                <span> · Dự phòng chung: </span>
                <span className="font-medium text-slate-900 dark:text-white">{focusedStaff.bk}</span>
                {primaryCountForFocused > 0 && (
                  <span className="text-amber-700 dark:text-amber-400">
                    {' '}
                    · Khi vắng, người ở cột Dự phòng 1 sẽ thay thế {primaryCountForFocused} đầu việc chính.
                  </span>
                )}
              </div>
            </div>
            <div className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums whitespace-nowrap shrink-0">
              Chính: {primaryCountForFocused} · Dự phòng: {backupCountForFocused}
            </div>
          </div>
        )}
      </div>

      {/* Task Grid Table */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="py-12 px-6 text-center space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {focusedStaff && focusedStaff.tasks.length === 0
                ? `${focusedStaff.name} hiện không nằm trong danh sách 24 đầu việc của bảng 05/05/2026.`
                : 'Không có đầu việc nào khớp với bộ lọc hiện tại.'}
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Hiển thị lại toàn bộ 24 đầu việc
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 px-4 w-12 text-center">STT</th>
                  <th className="py-2.5 px-4 min-w-[280px]">Công việc</th>
                  <th className="py-2.5 px-4 w-44">Chính</th>
                  <th className="py-2.5 px-4 w-40">Dự phòng 1</th>
                  <th className="py-2.5 px-4 w-40">Dự phòng 2</th>
                  <th className="py-2.5 px-4 w-40">Dự phòng 3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredTasks.map((row) => (
                  <tr key={row.index} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors align-top">
                    <td className="py-3 px-4 text-center font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                      {String(row.index).padStart(2, '0')}
                    </td>
                    <td className="py-3 px-4 text-slate-900 dark:text-slate-100 font-medium leading-snug">{row.t}</td>
                    <td className="py-3 px-4">{renderAssignees(row.c[0], 0)}</td>
                    <td className="py-3 px-4">{renderAssignees(row.c[1], 1)}</td>
                    <td className="py-3 px-4">{renderAssignees(row.c[2], 2)}</td>
                    <td className="py-3 px-4">{renderAssignees(row.c[3], 3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delegation Principles reminder */}
      <section className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
          Nguyên tắc dự phòng và ủy quyền kèm theo
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {DELEGATION_RULES.map((rule, idx) => (
            <li key={idx} className="flex gap-2.5">
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums shrink-0">
                0{idx + 1}.
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
