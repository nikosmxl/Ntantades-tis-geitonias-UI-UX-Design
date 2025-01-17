import { getDoc } from "firebase/firestore";
import { getDateFromMs, getDateFromObj } from '../../../utils/date';

export const filterData = async (applications, filters, setFunction) => {

  const applicationsWithBabysitters = await Promise.all(
    applications.map(async (application) => {
      if (application.babysitter) {
        const babysitterSnap = await getDoc(application.babysitter);
        if (babysitterSnap.exists()) {
          return { ...application, babysitterData: { ...babysitterSnap.data(), id: application.babysitter.id} };
        }
      }
      return application;
    })
  );

  const filteredApplications = applicationsWithBabysitters.filter(application => {
    // publication date
    if (filters?.publishedFrom && getDateFromObj(filters?.publishedFrom) > getDateFromMs(application.dateCreated)) return false;
    if (filters?.publishedTo && getDateFromObj({...filters.publishedTo, day: filters.publishedTo.day+1}) < getDateFromMs(application.dateCreated)) return false;

    // working hours
    if (filters.partTime && filters.fullTime) return true;
    if (filters.partTime && application.workingHours != 'Μερική απασχόληση') return false;
    if (filters.fullTime && application.workingHours != 'Πλήρης απασχόληση') return false;

    // babysitter gender
    if (filters?.babysitterGender && application.babysitterData.gender != filters.babysitterGender) return false;

    // babysitter age
    if (filters?.babysitterMinAge && application.babysitterData.age < filters.babysitterMinAge) return false;
    if (filters?.babysitterMaxAge && application.babysitterData.age > filters.babysitterMaxAge) return false;

    // babysitter nationality
    if (filters?.babysitterNationality && application.babysitterData.nationality != filters.babysitterNationality) return false;

    // babysitter experience
    if (filters?.babysitterExperience && application.babysitterData.experience != filters.babysitterExperience) return false;

    // specialization
    if (filters?.specialNeeds && !application.specialization?.specialNeeds) return false;
    if (filters?.asl && !application.specialization?.asl) return false;

    // transportation
    if (filters?.babysitterCar && filters.familyCar) return true;
    if (filters?.babysitterCar && application.transportation != 'babysitterCar') return false;
    if (filters?.familyCar && application.transportation != 'parentCar') return false;

    // services
    if (filters?.cooking && !(application?.services ?? []).includes('cooking')) return false;
    if (filters?.cleaning && !(application?.services ?? []).includes('cleaning')) return false;
    if (filters?.ironing && !(application?.services ?? []).includes('ironing')) return false;
    if (filters?.firstAid && !(application?.services ?? []).includes('firstAid')) return false;
    if (filters?.babysitterCertificate && !(application?.services ?? []).includes('babysitterCertificate')) return false;
    if (filters?.homeworkHelp && !(application?.services ?? []).includes('homeworkHelp')) return false;
    if (filters?.visits && !(application?.services ?? []).includes('visits')) return false;
    if (filters?.accompanyToActivities && !(application?.services ?? []).includes('accompanyToActivities')) return false;
    if (filters?.outdoorActivities && !(application?.services ?? []).includes('outdoorActivities')) return false;
    if (filters?.emergencyAvailability && !(application?.services ?? []).includes('emergencyAvailability')) return false;
    if (filters?.englishNativeSpeaker && !(application?.services ?? []).includes('englishNativeSpeaker')) return false;
    if (filters?.hosting && !(application?.services ?? []).includes('hosting')) return false;

    return true;
  });

  setFunction(filteredApplications.map(({babysitterData, ...application}) => application));
};