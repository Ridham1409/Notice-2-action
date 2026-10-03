import { db } from '../lib/firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { mockOpportunities } from '../mock/opportunities';
import { mockNotices } from '../mock/notices';

async function seedFirestore() {
  console.log('🚀 Starting Notice2Action Firestore Migration...');
  console.log('Target Project: notice-2-action-a1c30\n');

  let oppsImported = 0;
  let oppsSkipped = 0;
  let oppsFailed = 0;

  // 1. Seed Opportunities Collection
  console.log('--- Migrating Opportunities Collection ---');
  for (const opp of mockOpportunities) {
    try {
      const docRef = doc(db, 'opportunities', opp.id);
      await setDoc(
        docRef,
        {
          ...opp,
          updatedAt: new Date().toISOString(),
          createdAt: opp.schedule.opening_date || new Date().toISOString(),
        },
        { merge: true }
      );
      console.log(`✅ [Imported/Merged] Opportunity: ${opp.id} - ${opp.title}`);
      oppsImported++;
    } catch (err: any) {
      console.error(`❌ [Failed] Opportunity: ${opp.id} - ${err?.message}`);
      oppsFailed++;
    }
  }

  // 2. Seed Notices Collection
  console.log('\n--- Migrating Seed Notices Collection ---');
  let noticesImported = 0;
  let noticesFailed = 0;

  for (const notice of mockNotices) {
    try {
      const docRef = doc(db, 'notices', notice.id);
      await setDoc(
        docRef,
        {
          ...notice,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      console.log(`✅ [Imported/Merged] Notice: ${notice.id} - ${notice.fileName}`);
      noticesImported++;
    } catch (err: any) {
      console.error(`❌ [Failed] Notice: ${notice.id} - ${err?.message}`);
      noticesFailed++;
    }
  }

  console.log('\n=============================================');
  console.log('🎉 Migration Summary:');
  console.log(`Opportunities: ${oppsImported} imported/updated, ${oppsFailed} failed.`);
  console.log(`Notices: ${noticesImported} imported/updated, ${noticesFailed} failed.`);
  console.log('=============================================\n');
}

seedFirestore()
  .then(() => {
    console.log('Migration process completed successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal Migration Error:', err);
    process.exit(1);
  });
