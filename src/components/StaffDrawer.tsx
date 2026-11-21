import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { STAFF, TEAMS, getTeamColorClasses, staffById } from '../data/dvkhData';

interface StaffDrawerProps {
  selectedId: string | null;
  onClose: () => void;
  onSelectPerson: (id: string) => void;
}

export const StaffDrawer: React.FC<StaffDrawerProps> = ({ selectedId, onClose, onSelectPerson }) => {
  const person = selectedId ? staffById[selectedId] : null;
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!person) return;
    if (drawerRef.current) {
      drawerRef.current.scrollTop = 0;
    }
    const timer = window.setTimeout(() => {
      closeBtnRef.current?.focus({ preventScroll: true });
    }, 30);
    return () => window.clearTimeout(timer);
  }, [person?.id]);

  useEffect(() => {
    if (!person) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        const idx = STAFF.findIndex((s) => s.id === person.id);
        if (idx === -1) return;
        const nextIdx =
          e.key === 'ArrowRight' ? (idx + 1) % STAFF.length : (idx - 1 + STAFF.length) % STAFF.length;
        onSelectPerson(STAFF[nextIdx].id);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [person, onClose, onSelectPerson]);

  const currentIndex = person ? STAFF.findIndex((s) => s.id === person.id) : -1;
  const prevPerson = currentIndex >= 0 ? STAFF[(currentIndex - 1 + STAFF.length) % STAFF.length] : null;
  const nextPerson = currentIndex >= 0 ? STAFF[(currentIndex + 1) % STAFF.length] : null;

  return (
    <AnimatePresence>
      {person && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[1px]"
            aria-hidden="true"
          />

          <motion.aside
            key="drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-person-name"
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[460px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto flex flex-col"
          >
            {(() => {
              const colors = getTeamColorClasses(person.team);
              const mainTasks = person.tasks.filter((t) => t.r === 'Chính');
              const backupTasks = person.tasks.filter((t) => t.r !== 'Chính');

              return (
                <div className="flex-1 flex flex-col p-5 sm:p-6">
                  {/* Drawer Header */}
                  <div className={`pb-4 border-b-2 ${colors.border} flex items-start justify-between gap-4`}>
                    <div className="min-w-0">
                      <div className={`text-xs font-semibold ${colors.text}`}>{person.role}</div>
                      <h2
                        id="drawer-person-name"
                        className="mt-1 text-xl font-bold text-slate-900 dark:text-white leading-snug"
                      >
                        {person.name}
                      </h2>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-mono">{person.u}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">STT {person.stt}</span>
                        <span aria-hidden="true">·</span>
                        <span>{TEAMS[person.team].name}</span>
                      </div>
                    </div>
                    <button
                      ref={closeBtnRef}
                      type="button"
                      onClick={onClose}
                      aria-label="Đóng chi tiết cán bộ"
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="py-5 space-y-5 flex-1">
                    {person.quyhoach && (
                      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-amber-100 leading-relaxed">
                        <strong className="font-semibold text-amber-800 dark:text-amber-300">Cán bộ quy hoạch.</strong>{' '}
                        Vai trò đầu mối trong chiến dịch là nhiệm vụ thử thách, được lãnh đạo phòng kèm cặp, đánh giá
                        làm căn cứ phát triển lên vị trí cao hơn.
                      </div>
                    )}

                    {/* Reporting Facts */}
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-3">
                        <dt className="text-xs text-slate-500 dark:text-slate-400">Người giám sát trực tiếp</dt>
                        <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                          {person.sup}
                        </dd>
                      </div>
                      <div className="rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-3">
                        <dt className="text-xs text-slate-500 dark:text-slate-400">Người dự phòng</dt>
                        <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                          {person.bk}
                        </dd>
                      </div>
                    </dl>

                    {/* Regular Duties */}
                    <section className="space-y-2">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Nhiệm vụ thường xuyên</h3>
                      <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {person.duty.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </section>

                    {/* Campaign Role */}
                    <section className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Vai trò trong chiến dịch 5 mũi nhọn
                      </h3>
                      <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {person.camp.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </section>

                    {/* Detailed Task Grid */}
                    {(person.tasks.length > 0 || person.role === 'Giao dịch viên') && (
                      <section className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                          Công việc chi tiết{' '}
                          {person.tasks.length > 0 && (
                            <span className="font-mono text-xs font-normal text-slate-500 dark:text-slate-400 tabular-nums">
                              ({person.tasks.length} đầu việc)
                            </span>
                          )}
                        </h3>

                        {person.tasks.length === 0 ? (
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Chưa có tên trong bảng phân công công việc 05/05/2026, cần bổ sung.
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {mainTasks.length > 0 && (
                              <div>
                                <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                                  Phụ trách chính ({mainTasks.length})
                                </div>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                                  {mainTasks.map((t, i) => (
                                    <li key={i}>{t.t}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {backupTasks.length > 0 && (
                              <div>
                                <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                                  Dự phòng, thứ tự xử lý ({backupTasks.length})
                                </div>
                                <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                                  {backupTasks.map((t, i) => (
                                    <li key={i}>
                                      <span>{t.t}</span>
                                      <span className={`ml-1.5 text-xs font-semibold ${colors.text}`}>· {t.r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </section>
                    )}

                    {/* RM Pairing */}
                    {person.role === 'Giao dịch viên' && (
                      <section className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                          RM phối hợp (bảng ngày 02/06)
                        </h3>
                        {person.rm && person.rm.length > 0 ? (
                          <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                            {person.rm.map(([rmName, rmRole, rmDept], i) => (
                              <li key={i} className="flex flex-wrap items-baseline gap-x-2">
                                <span className="font-medium text-slate-900 dark:text-white">{rmName}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {rmRole} · {rmDept}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Chưa có trong bảng ghép cặp ngày 02/06, cần bổ sung.
                          </p>
                        )}
                      </section>
                    )}
                  </div>

                  {/* Prev / Next Navigation Footer */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
                    {prevPerson && (
                      <button
                        type="button"
                        onClick={() => onSelectPerson(prevPerson.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer min-w-0"
                      >
                        <ChevronLeft className="w-4 h-4 shrink-0" />
                        <span className="truncate">{prevPerson.name}</span>
                      </button>
                    )}
                    {nextPerson && (
                      <button
                        type="button"
                        onClick={() => onSelectPerson(nextPerson.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer min-w-0"
                      >
                        <span className="truncate">{nextPerson.name}</span>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
