import { BackgroundTheme } from "src/Types/Enums";
import getEasterDate from "./getEasterDate";
import { isWithinDaysBefore } from "./isWithinXDays";

enum MONTH {
	JANUARY = 1,
	FEBUARY = 2,
	MARCH = 3,
	APRIL = 4,
	MAY = 5,
	JUNE = 6,
	JULY = 7,
	AUGUST = 8,
	SEPTEMBER = 9,
	OCTOBER = 10,
	NOVEMBER = 11,
	DECEMBER = 12,
}

enum SEASONAL_THEME {
	WINTER = "winter",
	NEW_YEARS = "fireworks",
	GROUNDHOG_DAY = "groundhog",
	VALENTINES_DAY = "valentine",
	WOMENS_DAY = "womensday",
	ST_PATRICS_DAY = "pub",
	PI_DAY = "pie",
	EASTER = "easter",
	APRIL_FOOLS = "laughing",
	SPRING = "spring",
	EARTH_DAY = "earth",
	STARWARS = "yoda",
	CINCO_DE_MAYO = "mexico",
	SUMMER = "summer",
	FLAG_DAY = "america,flag",
	JUNETEENTH = "juneteenth",
	INDIGENOUS_PEOPLES_DAY = "firstnations",
	CANADA_DAY = "fireworks",
	JULY_FIRST = "fireworks",
	FALL = "fall",
	HALLOWEEN = "helloween",
	REMEMBERANCE_DAY = "veteran",
	CHRISTMAS = "christmas",
}

/**
 * Given a date, returns a seasonal tag for use in background generation
 * @param date
 */
const getSeasonalTag = (date: Date) => {
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();

	// Easter is an edge case cause it's a silly calculation
	const easter = getEasterDate(year);
	if (isWithinDaysBefore(date, 5, easter)) {
		return SEASONAL_THEME.EASTER;
	}

	switch (month) {
		case MONTH.JANUARY:
			return day === 1 ? SEASONAL_THEME.NEW_YEARS : SEASONAL_THEME.WINTER;
		case MONTH.FEBUARY:
			switch (day) {
				case 2:
					return SEASONAL_THEME.GROUNDHOG_DAY;
				case 14:
					return SEASONAL_THEME.VALENTINES_DAY;
				default:
					return SEASONAL_THEME.WINTER;
			}
		case MONTH.MARCH:
			switch (day) {
				case 8:
					return SEASONAL_THEME.WOMENS_DAY;
				case 14:
					return SEASONAL_THEME.PI_DAY;
				case 17:
					return SEASONAL_THEME.ST_PATRICS_DAY;
				default:
					return SEASONAL_THEME.WINTER;
			}
		case MONTH.APRIL: {
			switch (day) {
				case 1:
					return SEASONAL_THEME.APRIL_FOOLS;
				case 22:
					return SEASONAL_THEME.EARTH_DAY;
				default:
					return SEASONAL_THEME.SPRING;
			}
		}
		case MONTH.MAY: {
			switch (day) {
				case 4:
					return SEASONAL_THEME.STARWARS;
				case 5:
					return SEASONAL_THEME.CINCO_DE_MAYO;
				default:
					return SEASONAL_THEME.SPRING;
			}
		}
		case MONTH.JUNE: {
			switch (day) {
				case 14:
					return SEASONAL_THEME.FLAG_DAY;
				case 19:
					return SEASONAL_THEME.JUNETEENTH;
				case 21:
					return SEASONAL_THEME.INDIGENOUS_PEOPLES_DAY;
				default:
					return SEASONAL_THEME.SUMMER;
			}
		}
		case MONTH.JULY: {
			switch (day) {
				case 1:
					return SEASONAL_THEME.CANADA_DAY;
				case 4:
					return SEASONAL_THEME.JULY_FIRST;
				default:
					return SEASONAL_THEME.SUMMER;
			}
		}
		case MONTH.AUGUST: {
			return SEASONAL_THEME.SUMMER;
		}
		case MONTH.SEPTEMBER: {
			return SEASONAL_THEME.SUMMER;
		}
		case MONTH.OCTOBER:
			return day === 31 ? SEASONAL_THEME.HALLOWEEN : SEASONAL_THEME.FALL;
		case MONTH.NOVEMBER:
			return day === 11
				? SEASONAL_THEME.REMEMBERANCE_DAY
				: SEASONAL_THEME.FALL;
		case MONTH.DECEMBER:
			return day === 31
				? SEASONAL_THEME.NEW_YEARS
				: SEASONAL_THEME.CHRISTMAS;
	}
};

/**
 * Gets the background URL based on the theme settings, either for a specific theme, based on the season, or a custom background
 * @param backgroundTheme
 * @param customBackground
 */
const getBackground = (
	backgroundTheme: BackgroundTheme,
	customBackground: string,
	localBackgrounds: string[]
) => {
	switch (backgroundTheme) {
		case BackgroundTheme.SEASONS_AND_HOLIDAYS:
			const seasonalTag = getSeasonalTag(new Date());
			return `https://source.unsplash.com/random?${seasonalTag}&cachetag=${new Date()
				.toDateString()
				.replace(/ /g, "")}`;
		case BackgroundTheme.CUSTOM:
			return customBackground;
		case BackgroundTheme.LOCAL:
			return localBackgrounds[
				Math.floor(Math.random() * localBackgrounds.length)
			];
		case BackgroundTheme.TRANSPARENT_WITH_SHADOWS:
		case BackgroundTheme.TRANSPARENT:
			return null;
		default:
			return `https://source.unsplash.com/random?${backgroundTheme}&cachetag=${new Date()
				.toDateString()
				.replace(/ /g, "")}`;
	}
};

export default getBackground;
