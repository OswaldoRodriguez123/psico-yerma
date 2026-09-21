"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type FilterFn,
  type SortingState,
} from "@tanstack/react-table";
import { Select } from "@/components/ui/Select";

type DataTableProps<TData> = {
  data: TData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 2do genérico de ColumnDef es inevitable en un wrapper genérico
  columns: ColumnDef<TData, any>[];
  searchPlaceholder?: string;
  globalFilterFn?: FilterFn<TData>;
  initialSorting?: SortingState;
  pageSize?: number;
  emptyMessage?: string;
};

const pageSizes = [5, 10, 25, 50];
const sortIndicator = { asc: " ↑", desc: " ↓" } as const;

export function DataTable<TData>({
  data,
  columns,
  searchPlaceholder = "Buscar…",
  globalFilterFn,
  initialSorting,
  pageSize = 10,
  emptyMessage = "No hay resultados.",
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table no es compatible con React Compiler
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: initialSorting,
      pagination: { pageSize },
    },
  });

  const rows = table.getRowModel().rows;

  return (
    <div>
      <input
        type="search"
        value={globalFilter}
        onChange={(event) => setGlobalFilter(event.target.value)}
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-ink outline-none focus:border-primary"
      />

      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-primary-soft text-ink">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 font-semibold whitespace-nowrap"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer select-none"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {sortIndicator[
                          header.column.getIsSorted() as keyof typeof sortIndicator
                        ] ?? ""}
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr className="border-t border-border">
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-ink-soft"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-border">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-ink-soft">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {table.getFilteredRowModel().rows.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
          <div className="flex items-center gap-3">
            <span>
              Total: {table.getFilteredRowModel().rows.length} · Página{" "}
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </span>
            <label className="flex items-center gap-1.5">
              <span className="sr-only">Filas por página</span>
              <Select
                size="sm"
                value={table.getState().pagination.pageSize}
                onChange={(event) =>
                  table.setPageSize(Number(event.target.value))
                }
                className="cursor-pointer rounded-lg border border-border bg-surface py-1 pl-2 text-ink"
              >
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="cursor-pointer rounded-full border border-border px-4 py-1.5 font-semibold transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="cursor-pointer rounded-full border border-border px-4 py-1.5 font-semibold transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
