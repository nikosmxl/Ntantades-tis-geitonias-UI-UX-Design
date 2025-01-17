import { getDoc } from "firebase/firestore";
import { getDateFromMs, getDateFromObj } from '../../../utils/date';

export const filterData = async (applications, filters, setFunction) => {

  const applicationsWithParents = await Promise.all(
    applications.map(async (application) => {
      if (application.parent) {
        const parentSnap = await getDoc(application.parent);
        if (parentSnap.exists()) {
          return { ...application, parentData: { ...parentSnap.data(), id: application.parent.id} };
        }
      }
      return application;
    })
  );

  const filteredApplications = applicationsWithParents.filter(application => {
    // publication date
    if (filters?.publishedFrom && getDateFromObj(filters?.publishedFrom) > getDateFromMs(application.dateCreated)) return false;
    if (filters?.publishedTo && getDateFromObj({...filters.publishedTo, day: filters.publishedTo.day+1}) < getDateFromMs(application.dateCreated)) return false;

    // area
    if (filters?.area && !application.parentData.area.toLowerCase().includes(filters.area.toLowerCase())) return false;

    // working hours
    if (filters.partTime && filters.fullTime) return true;
    if (filters.partTime && application.workingHours != 'Μερική απασχόληση') return false;
    if (filters.fullTime && application.workingHours != 'Πλήρης απασχόληση') return false;

    // number of kids
    if (filters?.numKids && application.parentData.kids.length != filters.numKids) return false;

    // specialization
    if (filters?.specialNeeds && !application.specialization?.specialNeeds) return false;
    if (filters?.asl && !application.specialization?.asl) return false;

    return true;
  });

  setFunction(filteredApplications.map(({parentData, ...application}) => application));
};