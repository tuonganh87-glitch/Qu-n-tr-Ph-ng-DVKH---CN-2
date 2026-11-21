import React from 'react';
import { CAMPAIGN_MATRIX, CAMPAIGN_STEPS, TEAMS, getTeamColorClasses } from '../data/dvkhData';
import { PersonLink } from './PersonLink';

interface CampaignViewProps {
  selectedId: string | null;
  onSelectPerson: (id: string) => void;
}

export const CampaignView: React.FC<CampaignViewProps> = ({ selectedId, onSelectPerson }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="max-w-3xl space-y-2">
        <div className="text-xs font-medium text-blue-700 dark:text-blue-400">
          Chiến dịch giai đoạn 04/11/2026 – 31/01/2027 · Thông báo phân công 07/2026
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
          Ma trận đầu mối chiến dịch 5 mũi nhọn
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Chiến dịch chỉ do khối kinh doanh (Team 2 và Team 3) thực hiện; Team 1 (khối back và hỗ trợ) tập trung bảo đảm
          vận hành an toàn, liên tục. Phó phòng phụ trách chỉ tiêu theo đúng Thông báo 07/2026: Phó phòng Trần Thị Huyền
          phụ trách bảo hiểm; Phó phòng Đoàn Thị Bích Vân phụ trách thu phí và ngoại tệ. Hai cán bộ quy hoạch Trần Thị Ly Na
          và Phạm Thị Thùy Linh nhận vai trò đầu mối như một nhiệm vụ thử thách.
        </p>
      </section>

      {/* 5 Spearheads Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Phân công đầu mối và lãnh đạo phụ trách 5 mũi nhọn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CAMPAIGN_MATRIX.map((item, idx) => {
            const colors = getTeamColorClasses(item.team);
            return (
              <article
                key={item.product}
                className={`rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-[3px] ${colors.topBorder} p-5 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className={`font-semibold ${colors.text}`}>{TEAMS[item.team].shortName}</span>
                    <span className="font-mono tabular-nums">Mũi nhọn 0{idx + 1}</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">{item.product}</h3>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.notes}</p>
                </div>

                <dl className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-2 text-sm">
                  <div className="flex items-baseline justify-between gap-2">
                    <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">Đầu mối thực hiện</dt>
                    <dd className="font-semibold text-right">
                      <PersonLink id={item.ownerId} selectedId={selectedId} onSelect={onSelectPerson} />
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">Phó phòng chỉ tiêu</dt>
                    <dd className="text-right">
                      <PersonLink id={item.leadId} selectedId={selectedId} onSelect={onSelectPerson} />
                    </dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>

      {/* Monthly Workflow */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Quy trình vận hành hằng tháng
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {CAMPAIGN_STEPS.map((phase) => (
            <div
              key={phase.when}
              className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6"
            >
              <h3 className="text-base font-bold text-blue-800 dark:text-blue-300 pb-3 border-b border-slate-100 dark:border-slate-800">
                {phase.when}
              </h3>
              <ol className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {phase.items.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500 tabular-nums pt-0.5 shrink-0">
                      0{i + 1}.
                    </span>
                    <span className="leading-relaxed">
                      <strong className="font-semibold text-slate-900 dark:text-white">{step.actor}</strong>{' '}
                      {step.detail}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Operating separation note */}
      <section className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Phân tách nhiệm vụ giữa khối kinh doanh và khối hỗ trợ
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Team 1 (Kho quỹ, Kế toán, Tổ điện toán) không giao chỉ tiêu bán hàng trong chiến dịch để bảo đảm an toàn kho
            quỹ, hạ tầng CNTT và hạch toán thông suốt cho Team 2 và Team 3.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0 tabular-nums">
          Khối KD: 11 cán bộ · Hỗ trợ: 7 cán bộ
        </div>
      </section>
    </div>
  );
};
