import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
	buildSearchParams,
	getDefaultQuery,
	mergeSearchParams,
	parseQuery,
	type QuerySchema,
} from "@/lib/queryParams";

type QueryUpdateOptions = {
	replace?: boolean;
};

export const useQueryState = <T extends Record<string, unknown>>(
	schema: QuerySchema<T>,
) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const query = useMemo(
		() => parseQuery(searchParams, schema),
		[searchParams, schema],
	);

	const setQuery = useCallback(
		(patch: Partial<T>, options?: QueryUpdateOptions) => {
			const nextParams = mergeSearchParams(searchParams, schema, patch);
			setSearchParams(nextParams, { replace: options?.replace });
		},
		[schema, searchParams, setSearchParams],
	);

	const resetQuery = useCallback(
		(options?: QueryUpdateOptions) => {
			const defaults = getDefaultQuery(schema);
			const nextParams = buildSearchParams(defaults, schema);
			setSearchParams(nextParams, { replace: options?.replace });
		},
		[schema, setSearchParams],
	);

	return { query, setQuery, resetQuery, searchParams };
};
