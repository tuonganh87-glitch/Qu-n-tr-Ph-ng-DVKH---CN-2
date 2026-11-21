import React, { useState } from 'react';
import { DELEGATION_RULES, STAFF, TASK_GRID, TEAMS, getTeamColorClasses, staffById } from '../data/dvkhData';
import { PersonLink } from './PersonLink';

interface OrgChartViewProps {
  selectedId: string | null;
  onSelectPerson: (id: string) => void;
}

type HighlightFilter = 'all' | 'quyhoach' | 'lead' | 'campaign';

export const OrgChartView: React.FC<OrgChartViewProps> = ({ selectedId, onSelectPerson }) => {
  const [highlight, setHighlight] = useState<HighlightFilter>('all');

  const totalRmCount = STAFF.reduce((acc, s) => acc + (s.rm ? s.rm.length : 0), 0);

  const isHighlighted = (id: string): boolean => {
    if (highlight === 'all') return true;
    const p = staffById[id];
    if (!p) return false;
    if (highlight === 'quyhoach') return Boolean(p.quyhoach);
    if (highlight === 'lead') return Boolean(p.lead || p.role === 'Kiểm soát viên');
    if (highlight === 'campaign') return Boolean(p.tag || p.lead);
    return true;
  };

  const renderStaffRow = (id: string, roleLabel: string) => {
    const active = isHighlighted(id);
    return (
      <li
        key={id}
        className={`flex items-baseline justify-between gap-2 py-2.5 transition-opacity duration-150 ${
          active ? 'opacity-100' : 'opacity-30'
        }`}
      >
        <div className="min-w-0 text-sm font-medium">
          <PersonLink id={id} selectedId={selectedId} onSelect={onSelectPerson} />
        </div>
        <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400 text-right">{roleLabel}</span>
      </li>
    );
  };

  const t1Colors = getTeamColorClasses(1);
  const t2Colors = getTeamColorClasses(2);
  const t3Colors = getTeamColorClasses(3);

  return (
    <div className="space-y-8">
      {/* Intro & Real Structural Summary Strip */}
      <section className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
            Sơ đồ tổ chức và phân công Phòng Dịch vụ Khách hàng
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            VietinBank Chi nhánh 2 TP.HCM. Cơ cấu 18 cán bộ chia thành 3 team gồm một khối hỗ trợ và hai team giao dịch,
            bám sát Thông báo phân công nhiệm vụ 07/2026, bảng phân công công việc 05/05/2026 và chiến dịch 5 mũi nhọn
            giai đoạn 04/11/2026 – 31/01/2027.
          </p>
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
          <div className="px-4 py-3.5">
            <dt className="text-xs text-slate-500 dark:text-slate-400">Tổng nhân sự phòng</dt>
            <dd className="mt-1 text-xl font-semibold text-slate-900 dark:text-white tabular-nums">
              {STAFF.length} cán bộ
            </dd>
          </div>
          <div className="px-4 py-3.5">
            <dt className="text-xs text-slate-500 dark:text-slate-400">Cơ cấu tổ chức</dt>
            <dd className="mt-1 text-xl font-semibold text-slate-900 dark:text-white tabular-nums">
              3 team
            </dd>
          </div>
          <div className="px-4 py-3.5">
            <dt className="text-xs text-slate-500 dark:text-slate-400">Bảng phân công 05/05</dt>
            <dd className="mt-1 text-xl font-semibold text-slate-900 dark:text-white tabular-nums">
              {TASK_GRID.length} đầu việc
            </dd>
          </div>
          <div className="px-4 py-3.5">
            <dt className="text-xs text-slate-500 dark:text-slate-400">Ghép cặp GDV – RM</dt>
            <dd className="mt-1 text-xl font-semibold text-slate-900 dark:text-white tabular-nums">
              {totalRmCount} lượt RM
            </dd>
          </div>
        </dl>
      </section>

      {/* Interactive Filter Toolbar */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sơ đồ cây nhân sự</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Bấm vào họ tên từng cán bộ để mở hồ sơ phân công chi tiết
            </p>
          </div>

          <div
            role="group"
            aria-label="Lọc nhóm nổi bật"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700/80 self-start"
          >
            {(
              [
                { key: 'all', label: 'Tất cả' },
                { key: 'lead', label: 'Lãnh đạo & KSV' },
                { key: 'campaign', label: 'Đầu mối 5 mũi nhọn' },
                { key: 'quyhoach', label: 'Cán bộ quy hoạch' },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setHighlight(item.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  highlight === item.key
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Org Tree */}
        <div className="pt-1">
          {/* Executive Head Node */}
          <div className="max-w-md mx-auto">
            <div
              className={`rounded-xl bg-[#0A3F8C] dark:bg-blue-800 text-white px-5 py-4 text-center border border-[#083475] dark:border-blue-700 transition-opacity duration-150 ${
                isHighlighted('nguyet') ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div className="text-xs font-medium text-blue-100">Phó Phụ trách Phòng Dịch vụ Khách hàng</div>
              <div className="mt-1 text-lg font-bold">
                <PersonLink
                  id="nguyet"
                  selectedId={selectedId}
                  onSelect={onSelectPerson}
                  invert
                  className="text-lg font-bold"
                />
              </div>
              <div className="mt-1 text-xs text-blue-100/90">Phụ trách chung · Trực tiếp quản lý Team 1</div>
            </div>
          </div>

          {/* Connector Stem */}
          <div className="hidden lg:block w-px h-6 bg-slate-300 dark:bg-slate-700 mx-auto" />

          {/* Branches */}
          <div className="relative lg:pt-6">
            {/* Horizontal connector bar */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-0 left-[16.666%] right-[16.666%] h-px bg-slate-300 dark:bg-slate-700"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 lg:mt-0">
              {/* TEAM 1 */}
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute -top-6 left-1/2 w-px h-6 bg-slate-300 dark:bg-slate-700"
                />
                <section
                  className={`h-full rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-[3px] ${t1Colors.topBorder} p-5 flex flex-col`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className={`text-base font-bold ${t1Colors.text}`}>{TEAMS[1].name}</h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
                      7 cán bộ
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{TEAMS[1].scope}</p>

                  <div
                    className={`mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 transition-opacity duration-150 ${
                      isHighlighted('nguyet') ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    <div className={`text-xs font-semibold ${t1Colors.text}`}>Quản lý trực tiếp</div>
                    <div className="mt-1 flex items-baseline justify-between gap-2 text-sm font-semibold">
                      <PersonLink id="nguyet" selectedId={selectedId} onSelect={onSelectPerson} />
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400 shrink-0">
                        Phó PT phòng
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4 flex-1">
                    <div>
                      <h4 className={`text-xs font-semibold ${t1Colors.text} mb-1`}>Kho quỹ</h4>
                      <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
                        {renderStaffRow('tien', 'Thủ kho')}
                        {renderStaffRow('tuoi', 'Thủ quỹ')}
                      </ul>
                    </div>

                    <div>
                      <h4 className={`text-xs font-semibold ${t1Colors.text} mb-1`}>
                        Kế toán nội bộ, kế toán tài chính
                      </h4>
                      <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
                        {renderStaffRow('tran', 'Kế toán')}
                        {renderStaffRow('duyen', 'Kế toán')}
                      </ul>
                    </div>

                    <div>
                      <h4 className={`text-xs font-semibold ${t1Colors.text} mb-1`}>Tổ điện toán</h4>
                      <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
                        {renderStaffRow('thanh', 'Điện toán')}
                        {renderStaffRow('phong', 'Điện toán')}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              {/* TEAM 2 */}
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute -top-6 left-1/2 w-px h-6 bg-slate-300 dark:bg-slate-700"
                />
                <section
                  className={`h-full rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-[3px] ${t2Colors.topBorder} p-5 flex flex-col`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className={`text-base font-bold ${t2Colors.text}`}>{TEAMS[2].name}</h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
                      6 cán bộ
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{TEAMS[2].scope}</p>

                  <div
                    className={`mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 transition-opacity duration-150 ${
                      isHighlighted('huyen') ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    <div className={`text-xs font-semibold ${t2Colors.text}`}>Trưởng Team 2</div>
                    <div className="mt-1 flex items-baseline justify-between gap-2 text-sm font-semibold">
                      <PersonLink id="huyen" selectedId={selectedId} onSelect={onSelectPerson} />
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400 shrink-0">
                        Phó phòng
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4 flex-1">
                    <div>
                      <h4 className={`text-xs font-semibold ${t2Colors.text} mb-1`}>Giao dịch viên</h4>
                      <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
                        {renderStaffRow('nguyetanh', 'GDV')}
                        {renderStaffRow('bao', 'GDV')}
                        {renderStaffRow('phuonghoa', 'GDV · Đầu mối VBI')}
                        {renderStaffRow('kimlam', 'GDV')}
                      </ul>
                    </div>

                    <div>
                      <h4 className={`text-xs font-semibold ${t2Colors.text} mb-1`}>Kiểm soát viên</h4>
                      <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
                        {renderStaffRow('khang', 'Kiểm soát viên')}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              {/* TEAM 3 */}
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute -top-6 left-1/2 w-px h-6 bg-slate-300 dark:bg-slate-700"
                />
                <section
                  className={`h-full rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-[3px] ${t3Colors.topBorder} p-5 flex flex-col`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className={`text-base font-bold ${t3Colors.text}`}>{TEAMS[3].name}</h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
                      5 cán bộ
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{TEAMS[3].scope}</p>

                  <div
                    className={`mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 transition-opacity duration-150 ${
                      isHighlighted('van') ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    <div className={`text-xs font-semibold ${t3Colors.text}`}>Trưởng Team 3</div>
                    <div className="mt-1 flex items-baseline justify-between gap-2 text-sm font-semibold">
                      <PersonLink id="van" selectedId={selectedId} onSelect={onSelectPerson} />
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400 shrink-0">
                        Phó phòng
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4 flex-1">
                    <div>
                      <h4 className={`text-xs font-semibold ${t3Colors.text} mb-1`}>Giao dịch viên</h4>
                      <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
                        {renderStaffRow('haiyen', 'GDV')}
                        {renderStaffRow('thuhoa', 'GDV')}
                        {renderStaffRow('lyna', 'GDV · Ngoại hối, số đẹp, gói TK')}
                        {renderStaffRow('thuylinh', 'GDV · Đầu mối Manulife')}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delegation & Backup Principles */}
      <section className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Nguyên tắc dự phòng và ủy quyền
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Áp dụng theo Thông báo phân công nhiệm vụ 07/2026
          </span>
        </div>
        <ol className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
          {DELEGATION_RULES.map((rule, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500 tabular-nums pt-0.5 shrink-0">
                0{idx + 1}.
              </span>
              <span className="leading-relaxed">{rule}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};
