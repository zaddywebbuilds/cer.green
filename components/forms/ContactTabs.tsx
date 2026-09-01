'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AcademyForm } from '@/components/forms/AcademyForm';
import { ConsultingForm } from '@/components/forms/ConsultingForm';
import { cn } from '@/lib/utils';

export function ContactTabs({ courseOptions }: { courseOptions: string[] }) {
  const params = useSearchParams();
  const isAcademy = params.get('enquiry') === 'academy';
  const type = params.get('type');

  return (
    <>
      <nav aria-label="Choose enquiry type" className="mb-10">
        <ul className="flex flex-wrap gap-2">
          <li>
            <EnquiryTab href="/contact/?enquiry=consulting" active={!isAcademy}>
              Consulting enquiry
            </EnquiryTab>
          </li>
          <li>
            <EnquiryTab href="/contact/?enquiry=academy" active={isAcademy}>
              Academy &amp; training enquiry
            </EnquiryTab>
          </li>
        </ul>
      </nav>

      {isAcademy ? (
        <>
          <h3 className="text-h3">Training enquiry</h3>
          <p className="mt-4 mb-8 max-w-[62ch] text-ink-700">
            For professional courses, corporate training, executive sessions and custom programmes.
          </p>
          <AcademyForm
            courseOptions={courseOptions}
            defaultParticipantType={type === 'corporate' ? 'Corporate / group' : undefined}
          />
        </>
      ) : (
        <>
          <h3 className="text-h3">Consulting enquiry</h3>
          <p className="mt-4 mb-8 max-w-[62ch] text-ink-700">
            For ESG, carbon, climate, compliance and sustainable finance advisory.
          </p>
          <ConsultingForm />
        </>
      )}
    </>
  );
}

function EnquiryTab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'inline-flex min-h-12 items-center rounded-[3px] border px-5 font-heading text-[0.95rem] font-semibold transition-colors',
        active
          ? 'border-forest bg-forest text-white'
          : 'border-line bg-white text-ink-700 hover:border-forest/40',
      )}
    >
      {children}
    </Link>
  );
}
