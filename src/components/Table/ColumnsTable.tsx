/* eslint-disable @typescript-eslint/indent */
import { type ColumnDef } from "@tanstack/react-table";
import { type User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ColumnsTableProps {
  handleEditClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}
export const columns = ({
  handleEditClick,
  handleDeleteClick,
}: ColumnsTableProps): Array<ColumnDef<User>> => [
  // Name
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className="pl-7"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-2 gap-4">
        <Avatar>
          {/* .original is used to access the data value of the row */}
          <AvatarImage src={row.original.profile_picture} />
          <AvatarFallback>
            {row.original.name
              ? row.original.name
                  .split(" ")
                  .slice(0, 2)
                  .map((value) => value[0].toUpperCase())
              : null}
          </AvatarFallback>
        </Avatar>
        {row.original.name}
      </div>
    ),
  },
  // EMail
  {
    accessorKey: "mail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (row.original.status ? "Active" : "Inactive"),
  },
  // Edit
  {
    accessorKey: "edit",
    header: "",
    cell: ({ row }) => (
      <button
        onClick={() => {
          handleEditClick(row.original.id);
        }}
        placeholder="edit"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_33_266)">
            <path
              d="M12 1.33333L14.6667 3.99999"
              stroke="#757D8A"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.99992 13.6667L12.6666 5.99999L9.99992 3.33333L2.33325 11L1.33325 14.6667L4.99992 13.6667Z"
              stroke="#757D8A"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_33_266">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    ),
  },
  // Delete
  {
    accessorKey: "delete",
    header: "",
    cell: ({ row }) => (
      <button
        onClick={() => {
          handleDeleteClick(row.original.id);
        }}
        placeholder="delete"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 4H3.33333H14"
            stroke="#757D8A"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.33325 3.99999V2.66666C5.33325 2.31304 5.47373 1.9739 5.72378 1.72385C5.97383 1.4738 6.31296 1.33333 6.66659 1.33333H9.33325C9.68687 1.33333 10.026 1.4738 10.2761 1.72385C10.5261 1.9739 10.6666 2.31304 10.6666 2.66666V3.99999M12.6666 3.99999V13.3333C12.6666 13.687 12.5261 14.0261 12.2761 14.2761C12.026 14.5262 11.6869 14.6667 11.3333 14.6667H4.66659C4.31296 14.6667 3.97382 14.5262 3.72378 14.2761C3.47373 14.0261 3.33325 13.687 3.33325 13.3333V3.99999H12.6666Z"
            stroke="#757D8A"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.66675 7.33333V11.3333"
            stroke="#757D8A"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.33325 7.33333V11.3333"
            stroke="#757D8A"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    ),
  },
];
