import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ClipboardList,
  GitFork,
  Menu,
  Moon,
  Printer,
  Search,
  Sun,
  Target,
  Users,
  UserSquare2,
  X,
} from 'lucide-react';
import { STAFF, staffById } from './data/dvkhData';
import { OrgChartView } from './components/OrgChartView';
import { CampaignView } from './components/CampaignView';
import { RosterView } from './components/RosterView';
import { TaskGridView } from './components/TaskGridView';
import { RmPairingView } from './components/RmPairingView';
import { StaffDrawer } from './components/StaffDrawer';

type ViewId = 'org' | 'campaign' | 'roster' | 'tasks' | 'rm';

const NAV_ITEMS: { id: ViewId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'org', label: 'Sơ đồ tổ chức', icon: GitFork },
  { id: 'campaign', label: 'Chiến dịch 5 mũi nhọn', icon: Target },
  { id: 'roster', label: 'Danh sách cán bộ', icon: Users },
  { id: 'tasks', label: 'Phân công công việc', icon: ClipboardList },
  { id: 'rm', label: 'Ghép cặp GDV – RM', icon: UserSquare2 },
];

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>('org');
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const hashId = window.location.hash.replace('#', '');
    return staffById[hashId] ? hashId : null;
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = window.localStorage.getItem('dvkh-theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    window.localStorage.setItem('dvkh-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace('#', '');
      setSelectedPersonId(staffById[id] ? id : null);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSelectPerson = useCallback((id: string) => {
    if (!staffById[id]) return;
    setSelectedPersonId(id);
    setQuickQuery('');
    setMobileNavOpen(false);
    try {
      window.history.replaceState(null, '', `#${id}`);
    } catch {
      // ignore history errors in sandboxed iframes
    }
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedPersonId(null);
    try {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch {
      // ignore
    }
  }, []);

  const quickMatches = useMemo(() => {
    const q = quickQuery.trim().toLowerCase();
    if (!q) return [];
    return STAFF.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.u.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [quickQuery]);

  const activeNavItem = NAV_ITEMS.find((n) => n.id === activeView) || NAV_ITEMS[0];

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-2.5 h-6 rounded-xs bg-[#C8102E] shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <div className="text-sm font-bold tracking-tight text-[#0A3F8C] dark:text-blue-300 truncate">
                Phòng DVKH
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                VietinBank Chi nhánh 2
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Đóng thanh điều hướng"
            className="lg:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Person Finder */}
        <div className="mt-4 relative">
          <Search
            className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            value={quickQuery}
            onChange={(e) => setQuickQuery(e.target.value)}
            placeholder="Mở nhanh hồ sơ cán bộ..."
            aria-label="Mở nhanh hồ sơ cán bộ"
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
          />
          {quickQuery && (
            <button
              type="button"
              onClick={() => setQuickQuery('')}
              aria-label="Xóa tìm kiếm nhanh"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {quickQuery.trim() !== '' && (
            <div className="absolute left-0 right-0 mt-1.5 z-30 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
              {quickMatches.length === 0 ? (
                <div className="px-3 py-2.5 text-xs text-slate-500 dark:text-slate-400">
                  Không tìm thấy cán bộ phù hợp.
                </div>
              ) : (
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {quickMatches.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectPerson(p.id)}
                        className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{p.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          Team {p.team} · {p.role}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Điều hướng chính">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveView(item.id);
                setMobileNavOpen(false);
              }}
              aria-current={active ? 'page' : undefined}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#0A3F8C] dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  active ? 'text-[#0A3F8C] dark:text-blue-300' : 'text-slate-400 dark:text-slate-500'
                }`}
                aria-hidden="true"
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <button
          type="button"
          onClick={() => setIsDark((d) => !d)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>{isDark ? 'Chế độ tối' : 'Chế độ sáng'}</span>
          {isDark ? <Moon className="w-3.5 h-3.5" aria-hidden="true" /> : <Sun className="w-3.5 h-3.5" aria-hidden="true" />}
        </button>

        <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Cập nhật đội hình tháng 11/2026 · TB 07/2026 · Bảng 05/05 &amp; 02/06.
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[264px] shrink-0 sticky top-0 h-screen no-print">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex no-print">
          <div
            className="fixed inset-0 bg-slate-950/45"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-[272px] max-w-[85vw] h-full">{SidebarContent}</aside>
        </div>
      )}

      {/* Main Column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar Contract: Breadcrumb on Left, 1 Primary Action on Right */}
        <header className="sticky top-0 z-20 h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between gap-4 no-print">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Mở menu điều hướng"
              className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
              <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap hidden sm:inline">
                VietinBank CN2
              </span>
              <span className="text-slate-300 dark:text-slate-600 hidden sm:inline" aria-hidden="true">
                /
              </span>
              <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap">Phòng DVKH</span>
              <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">
                /
              </span>
              <span className="font-semibold text-slate-900 dark:text-white truncate">{activeNavItem.label}</span>
            </nav>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-[#0A3F8C] hover:bg-[#083475] dark:bg-blue-700 dark:hover:bg-blue-600 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>In bảng phân công</span>
          </button>
        </header>

        {/* Main Workspace Viewport */}
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
          {activeView === 'org' && (
            <OrgChartView selectedId={selectedPersonId} onSelectPerson={handleSelectPerson} />
          )}
          {activeView === 'campaign' && (
            <CampaignView selectedId={selectedPersonId} onSelectPerson={handleSelectPerson} />
          )}
          {activeView === 'roster' && (
            <RosterView selectedId={selectedPersonId} onSelectPerson={handleSelectPerson} />
          )}
          {activeView === 'tasks' && (
            <TaskGridView selectedId={selectedPersonId} onSelectPerson={handleSelectPerson} />
          )}
          {activeView === 'rm' && (
            <RmPairingView selectedId={selectedPersonId} onSelectPerson={handleSelectPerson} />
          )}

          {/* Institutional Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl">
            Tài liệu nội bộ Phòng DVKH – VietinBank Chi nhánh 2 TP.HCM. Đội hình theo danh sách cập nhật tháng 11/2026;
            nhiệm vụ lãnh đạo phòng theo Thông báo phân công nhiệm vụ 07/2026; phân công công việc chi tiết theo bảng
            05/05/2026; ghép cặp GDV – RM theo bảng ngày 02/06. Nhiệm vụ kiểm soát, phê duyệt thực hiện theo thẩm quyền
            và quy định hiện hành của VietinBank.
          </footer>
        </main>
      </div>

      {/* Staff Detail Slide-over Drawer */}
      <StaffDrawer
        selectedId={selectedPersonId}
        onClose={handleCloseDrawer}
        onSelectPerson={handleSelectPerson}
      />
    </div>
  );
}
