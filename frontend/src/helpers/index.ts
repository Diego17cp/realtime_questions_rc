const getTimeAgo = (iso: string) => {
	if (!iso) return "";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;

	const diffMs = Date.now() - d.getTime();
	const seconds = Math.floor(diffMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (seconds < 10) return "hace unos segundos";
	if (seconds < 60) return `hace ${seconds} segundo${seconds > 1 ? "s" : ""}`;
	if (minutes < 60) return `hace ${minutes} minuto${minutes > 1 ? "s" : ""}`;
	if (hours < 24) return `hace ${hours} hora${hours > 1 ? "s" : ""}`;
	return `hace ${days} día${days > 1 ? "s" : ""}`;
};
const badgeBgColors = [
	"bg-blue-100 text-blue-800",
	"bg-green-100 text-green-800",
	"bg-purple-100 text-purple-800",
	"bg-orange-100 text-orange-800",
	"bg-pink-100 text-pink-800",
	"bg-rose-50 text-rose-700",
	"bg-emerald-100 text-emerald-800",
	"bg-teal-50 text-teal-800",
	"bg-indigo-50 text-indigo-800",
	"bg-amber-100 text-amber-800",
	"bg-sky-50 text-sky-800",
	"bg-gray-100 text-gray-800",
];
const getRandomBadgeColor = () => {
	return badgeBgColors[Math.floor(Math.random() * badgeBgColors.length)];
};

export { getTimeAgo, getRandomBadgeColor };
