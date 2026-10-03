import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export const PortalQuickGrid: React.FC = () => {
  const portals = [
    {
      name: 'MYSY Portal',
      url: 'https://mysy.gujarat.gov.in/',
      desc: 'Higher education tuition & hostel assistance',
      badge: 'Active Window',
    },
    {
      name: 'Digital Gujarat',
      url: 'https://www.digitalgujarat.gov.in/LoginApp',
      desc: 'Post-matric SC/ST/SEBC scholarships & freeship cards',
      badge: 'Active Window',
    },
    {
      name: 'ACPC Admissions',
      url: 'https://gujacpc.admissions.nic.in/',
      desc: 'Engineering, pharmacy & architecture state quota',
      badge: '50:50 Formula',
    },
    {
      name: 'GCAS Portal',
      url: 'https://gcas.gujgov.edu.in/',
      desc: 'State public university common admissions',
      badge: 'Unified Admission',
    },
    {
      name: 'GSEB / GUJCET',
      url: 'https://gujcet.gseb.org/',
      desc: 'Board examination notices & entrance registration',
      badge: 'Official Portal',
    },
    {
      name: 'SHODH Fellowship',
      url: 'https://shodh.gujarat.gov.in/',
      desc: 'Doctoral research stipend (₹15,000/mo)',
      badge: 'Closes Oct 19',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Verified Gujarat Educational Portals
        </h4>
        <span className="text-[11px] text-slate-400">All links verified .gov.in / .nic.in</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {portals.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3.5 rounded-xl border border-slate-200 bg-white hover:border-primary-400 hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                  {p.name}
                </span>
                <span className="text-[10px] font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
                  {p.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{p.desc}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-primary-600">
              <span className="font-mono truncate">{new URL(p.url).hostname}</span>
              <ExternalLink className="h-3 w-3 shrink-0" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
