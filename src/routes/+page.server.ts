import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import type { ServerStatus } from '$lib/types';
import { SERVER_STATUS_DEPENDS_KEY } from '$lib/pages/index/constants';

export const load: PageServerLoad = async ({ depends }) => {
	depends(SERVER_STATUS_DEPENDS_KEY);
	const path = `${env.HOME_PATH}/stats`;
	const res = await fetch(path);
	const data: ServerStatus = await res.json();
	return data;
};
