import React, { useState, useEffect } from 'react';
import { StudentProfile } from '@/types';
import { profileService } from '@/services/profileService';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ShieldCheck, Check, Sparkles, UserCheck } from 'lucide-react';

export interface ProfileFormProps {
  onSaved?: (profile: StudentProfile) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSaved }) => {
  const [profile, setProfile] = useState<StudentProfile>(profileService.getProfile());
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    profileService.loadProfileFromCloud().then((p) => {
      setProfile(p);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updated = await profileService.saveProfile(profile);
      setIsSubmitting(false);
      setIsSaved(true);
      if (onSaved) onSaved(updated);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const gujaratDistricts = [
    'Ahmedabad',
    'Amreli',
    'Anand',
    'Aravalli',
    'Banaskantha',
    'Bharuch',
    'Bhavnagar',
    'Botad',
    'Chhota Udaipur',
    'Dahod',
    'Dang',
    'Devbhoomi Dwarka',
    'Gandhinagar',
    'Gir Somnath',
    'Jamnagar',
    'Junagadh',
    'Kheda',
    'Kutch',
    'Mahisagar',
    'Mehsana',
    'Morbi',
    'Narmada',
    'Navsari',
    'Panchmahal',
    'Patan',
    'Porbandar',
    'Rajkot',
    'Sabarkantha',
    'Surat',
    'Surendranagar',
    'Tapi',
    'Vadodara',
    'Valsad',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. About You */}
      <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            1. About You
          </h3>
          <p className="text-xs text-slate-500">
            Basic contact details and Gujarat residence status.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name *"
            value={profile.fullName}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            required
          />

          <Input
            label="Email Address *"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            required
          />

          <Input
            label="Mobile Number"
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />

          <Select
            label="Gujarat Domicile *"
            value={profile.gujaratDomicile ? 'yes' : 'no'}
            onChange={(e) =>
              setProfile({ ...profile, gujaratDomicile: e.target.value === 'yes' })
            }
            options={[
              { value: 'yes', label: 'Yes (Gujarat Resident)' },
              { value: 'no', label: 'No (Other State)' },
            ]}
          />
        </div>
      </div>

      {/* 2. Education */}
      <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            2. Education
          </h3>
          <p className="text-xs text-slate-500">
            Your current course, stream, and academic scores.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Select
            label="Academic Level *"
            value={profile.academicLevel}
            onChange={(e) =>
              setProfile({ ...profile, academicLevel: e.target.value as any })
            }
            options={[
              { value: 'Class 10', label: 'Class 10' },
              { value: 'Class 11', label: 'Class 11' },
              { value: 'Class 12', label: 'Class 12' },
              { value: 'Diploma', label: 'Diploma / Polytechnic' },
              { value: 'UG', label: 'Undergraduate (BE/BTech, MBBS, BA, BSc)' },
              { value: 'PG', label: 'Postgraduate (ME/MTech, MSc, MBA)' },
              { value: 'PhD', label: 'Ph.D. Research' },
            ]}
          />

          <Input
            label="Course / Stream *"
            placeholder="e.g. B.Tech Computer Engineering"
            value={profile.courseStream}
            onChange={(e) => setProfile({ ...profile, courseStream: e.target.value })}
            required
          />

          <Input
            label="Board / University *"
            placeholder="e.g. GTU, Gujarat University"
            value={profile.boardUniversity}
            onChange={(e) => setProfile({ ...profile, boardUniversity: e.target.value })}
            required
          />

          <Input
            label="Current Semester / Year"
            placeholder="e.g. Semester 3 or Year 2"
            value={profile.currentSemester || ''}
            onChange={(e) => setProfile({ ...profile, currentSemester: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <Input
            label="Marks / Percentile / CGPA *"
            placeholder="e.g. 84.5% or 85.2 Percentile"
            value={profile.percentageOrCgpa}
            onChange={(e) => setProfile({ ...profile, percentageOrCgpa: e.target.value })}
            helperText="Used to match percentile cutoffs (e.g. MYSY >= 80th percentile)."
            required
          />

          <Select
            label="Social Category *"
            value={profile.category}
            onChange={(e) => setProfile({ ...profile, category: e.target.value as any })}
            options={[
              { value: 'General', label: 'General / Open' },
              { value: 'EWS', label: 'EWS (Economically Weaker Section)' },
              { value: 'SEBC', label: 'SEBC / OBC' },
              { value: 'SC', label: 'Scheduled Caste (SC)' },
              { value: 'ST', label: 'Scheduled Tribe (ST)' },
              { value: 'Other', label: 'Other' },
            ]}
          />
        </div>
      </div>

      {/* 3. Eligibility Details */}
      <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            3. Eligibility Details
          </h3>
          <p className="text-xs text-slate-500">
            Family income and location used to match scholarship criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Annual Family Income (INR) *"
            type="number"
            min={0}
            step={10000}
            value={profile.annualFamilyIncome}
            onChange={(e) =>
              setProfile({ ...profile, annualFamilyIncome: Number(e.target.value) })
            }
            helperText="MYSY limit: ₹6,00,000; Digital Gujarat limit: ₹2,50,000."
            required
          />

          <Select
            label="District *"
            value={profile.district}
            onChange={(e) => setProfile({ ...profile, district: e.target.value })}
            options={gujaratDistricts.map((d) => ({ value: d, label: d }))}
          />

          <Input
            label="Taluka *"
            placeholder="e.g. Daskroi, Anand, City"
            value={profile.taluka}
            onChange={(e) => setProfile({ ...profile, taluka: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Select
            label="Hosteller / Day Scholar *"
            value={profile.hosteller ? 'yes' : 'no'}
            onChange={(e) =>
              setProfile({ ...profile, hosteller: e.target.value === 'yes' })
            }
            options={[
              { value: 'yes', label: 'Hosteller (Staying in non-govt hostel outside native taluka)' },
              { value: 'no', label: 'Day Scholar (Commuting from home)' },
            ]}
            helperText="Hostellers qualify for ₹1,200/mo (₹12,000/yr) additional MYSY assistance."
          />

          <Select
            label="Persons with Benchmark Disability (PwD)"
            value={profile.disability ? 'yes' : 'no'}
            onChange={(e) =>
              setProfile({ ...profile, disability: e.target.value === 'yes' })
            }
            options={[
              { value: 'no', label: 'No' },
              { value: 'yes', label: 'Yes (>= 40% benchmark disability)' },
            ]}
          />
        </div>

        <div className="pt-2">
          <Input
            label="Special Circumstances (Optional)"
            placeholder="e.g. First-generation student, orphan, parent in armed forces..."
            value={profile.specialCircumstances || ''}
            onChange={(e) =>
              setProfile({ ...profile, specialCircumstances: e.target.value })
            }
          />
        </div>
      </div>

      {/* Form Submission Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Profile changes instantly update matched opportunities</span>
        </div>

        <div className="flex items-center gap-3">
          {isSaved && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 animate-in fade-in">
              <Check className="h-3.5 w-3.5" />
              Profile Saved Successfully
            </span>
          )}

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<UserCheck className="h-4 w-4" />}
          >
            Save Profile
          </Button>
        </div>
      </div>
    </form>
  );
};
