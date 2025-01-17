import { getDoc } from "firebase/firestore";
import { getAverageRating } from "../../../utils/calc";

export const filterData = async (listings, filters, setFunction, sorting) => {

  const listingsWithBabysitters = await Promise.all(
    listings.map(async (listing) => {
      if (listing.babysitter) {
        const babysitterSnap = await getDoc(listing.babysitter);
        if (babysitterSnap.exists()) {
          return { ...listing, babysitter: { ...babysitterSnap.data(), id: listing.babysitter.id} };
        }
      }
      return listing;
    })
  );

  const filteredListings = listingsWithBabysitters.filter(listing => {
    // area
    if (filters?.area && !listing.areas.find(area => area.city.label.toLowerCase().includes(filters.area.toLowerCase()))) return false;

    // babysitter gender
    if (filters?.babysitterGender && listing.babysitter.gender != filters.babysitterGender) return false;

    // babysitter age
    if (filters?.babysitterMinAge && listing.babysitter.age < filters.babysitterMinAge) return false;
    if (filters?.babysitterMaxAge && listing.babysitter.age > filters.babysitterMaxAge) return false;

    // babysitter nationality
    if (filters?.babysitterNationality && listing.babysitter.nationality != filters.babysitterNationality) return false;

    // occupation
    if (filters?.partTime && filters.fullTime) return true;
    if (filters?.partTime && listing.workingHours != 'Μερική απασχόληση') return false;
    if (filters?.fullTime && listing.workingHours != 'Πλήρης απασχόληση') return false;

    // availability
    if (filters?.currentlyAvailable && listing.startingDate != 'Anytime') return false;
    if (filters?.availability.length > 0) {
      const anyTimeslotFound = filters.availability.reduce((accumulator, timeslot) => {
        return accumulator || listing.availability.find((slot) => slot.dayIndex === timeslot.dayIndex && slot.timeIndex === timeslot.timeIndex);
      }, false);

      if (!anyTimeslotFound) return false;
    }

    // babysitter experience
    if (filters?.babysitterExperience && listing.babysitter.experience != filters.babysitterExperience) return false;

    // babysitter age experience
    if (filters?.twoToSixMonths && !listing.babysitter.ageExperience.includes('2-6 μηνών')) return false;
    if (filters?.sixToTwelveMonths && !listing.babysitter.ageExperience.includes('6-12 μηνών')) return false;
    if (filters?.oneToTwoyears && !listing.babysitter.ageExperience.includes('1-2 ετών')) return false;
    if (filters?.moreThanTwoYears && !listing.babysitter.ageExperience.includes('> 2 ετών')) return false;

    // babysitter languages
    if (filters?.english && !listing.babysitter.ageExperience.includes('english')) return false;
    if (filters?.french && !listing.babysitter.ageExperience.includes('french')) return false;
    if (filters?.italian && !listing.babysitter.ageExperience.includes('italian')) return false;
    if (filters?.spanish && !listing.babysitter.ageExperience.includes('spanish')) return false;
    if (filters?.russian && !listing.babysitter.ageExperience.includes('russian')) return false;
    if (filters?.arabic && !listing.babysitter.ageExperience.includes('arabic')) return false;
    if (filters?.german && !listing.babysitter.ageExperience.includes('german')) return false;

    // babysitter specialization
    if (filters?.specialNeeds && !listing.babysitter.specialization?.specialNeeds) return false;
    if (filters?.asl && !listing.babysitter.specialization?.asl) return false;

    // transportation
    if (filters?.babysitterCar && filters.familyCar) return true;
    if (filters?.babysitterCar && listing.transportation != 'babysitterCar') return false;
    if (filters?.familyCar && listing.transportation != 'parentCar') return false;

    // services
    if (filters?.cooking && !(listing?.services ?? []).includes('cooking')) return false;
    if (filters?.cleaning && !(listing?.services ?? []).includes('cleaning')) return false;
    if (filters?.ironing && !(listing?.services ?? []).includes('ironing')) return false;
    if (filters?.firstAid && !(listing?.services ?? []).includes('firstAid')) return false;
    if (filters?.babysitterCertificate && !(listing?.services ?? []).includes('babysitterCertificate')) return false;
    if (filters?.homeworkHelp && !(listing?.services ?? []).includes('homeworkHelp')) return false;
    if (filters?.visits && !(listing?.services ?? []).includes('visits')) return false;
    if (filters?.accompanyToActivities && !(listing?.services ?? []).includes('accompanyToActivities')) return false;
    if (filters?.outdoorActivities && !(listing?.services ?? []).includes('outdoorActivities')) return false;
    if (filters?.emergencyAvailability && !(listing?.services ?? []).includes('emergencyAvailability')) return false;
    if (filters?.englishNativeSpeaker && !(listing?.services ?? []).includes('englishNativeSpeaker')) return false;
    if (filters?.hosting && !(listing?.services ?? []).includes('hosting')) return false;

    return true;
  });

  switch (sorting) {
    case 'Αξιολόγηση (Φθίνουσα)':
      setFunction(filteredListings.sort((listingA, listingB) => {
        const babysitterA = listingA.babysitter;
        const babysitterB = listingB.babysitter;

        const avgRatingA = getAverageRating(babysitterA);
        const avgRatingB = getAverageRating(babysitterB);

        return avgRatingB - avgRatingA;
      }));
      return;
    case 'Αξιολόγηση (Αύξουσα)':
      setFunction(filteredListings.sort((listingA, listingB) => {
        const babysitterA = listingA.babysitter;
        const babysitterB = listingB.babysitter;

        const avgRatingA = getAverageRating(babysitterA);
        const avgRatingB = getAverageRating(babysitterB);

        return avgRatingA - avgRatingB;
      }));
      return;
    default:
      setFunction(filteredListings);
      return;
  }

};