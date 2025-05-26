import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/registry/default/ui/avatar';
import { Badge } from '@/registry/default/ui/badge';
import { Button } from '@/registry/default/ui/button';
import { DataGrid, DataGridContainer } from '@/registry/default/ui/data-grid';
import { DataGridPagination } from '@/registry/default/ui/data-grid-pagination';
import { DataGridTable } from '@/registry/default/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/registry/default/ui/scroll-area';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface IData {
  id: string;
  name: string;
  availability: 'online' | 'away' | 'busy' | 'offline';
  avatar: string;
  status: 'active' | 'inactive';
  flag: string; // Emoji flags
  email: string;
  company: string;
  role: string;
  joined: string;
  location: string;
  balance: number;
  details: string; // New field
}

const demoData: IData[] = [
  {
    id: '1',
    name: 'Kathryn Campbell',
    availability: 'online',
    avatar: '1.png',
    status: 'active',
    flag: '🇺🇸',
    email: 'kathryn@apple.com',
    company: 'Apple',
    role: 'CEO',
    joined: '2021-04-15',
    location: 'San Francisco, USA',
    balance: 5143.03,
    details:
      'Kathryn is a visionary leader at Apple, focusing on innovation and team growth.',
  },
  {
    id: '2',
    name: 'Robert Smith',
    availability: 'away',
    avatar: '2.png',
    status: 'inactive',
    flag: '🇬🇧',
    email: 'robert@openai.com',
    company: 'OpenAI',
    role: 'CTO',
    joined: '2020-07-20',
    location: 'London, UK',
    balance: 4321.87,
    details:
      'Robert is a technology pioneer specializing in artificial intelligence and machine learning.',
  },
  {
    id: '3',
    name: 'Sophia Johnson',
    availability: 'busy',
    avatar: '3.png',
    status: 'active',
    flag: '🇨🇦',
    email: 'sophia@meta.com',
    company: 'Meta',
    role: 'Designer',
    joined: '2019-03-12',
    location: 'Toronto, Canada',
    balance: 7654.98,
    details:
      'Sophia is a creative designer passionate about building user-centric experiences.',
  },
  {
    id: '4',
    name: 'Lucas Walker',
    availability: 'offline',
    avatar: '4.png',
    status: 'inactive',
    flag: '🇦🇺',
    email: 'lucas@tesla.com',
    company: 'Tesla',
    role: 'Developer',
    joined: '2022-01-18',
    location: 'Sydney, Australia',
    balance: 3456.45,
    details:
      'Lucas is a talented developer focused on innovative solutions in automotive technology.',
  },
  {
    id: '5',
    name: 'Emily Davis',
    availability: 'online',
    avatar: '5.png',
    status: 'active',
    flag: '🇩🇪',
    email: 'emily@sap.com',
    company: 'SAP',
    role: 'Lawyer',
    joined: '2023-05-23',
    location: 'Berlin, Germany',
    balance: 9876.54,
    details:
      'Emily is a corporate lawyer specializing in technology and software agreements.',
  },
  {
    id: '6',
    name: 'James Lee',
    availability: 'away',
    avatar: '6.png',
    status: 'active',
    flag: '🇲🇾',
    email: 'james@keenthemes.com',
    company: 'Keenthemes',
    role: 'Director',
    joined: '2018-11-30',
    location: 'Kuala Lumpur, MY',
    balance: 6214.22,
    details:
      'James oversees product development and team leadership at Keenthemes.',
  },
  {
    id: '7',
    name: 'Isabella Martinez',
    availability: 'busy',
    avatar: '7.png',
    status: 'inactive',
    flag: '🇪🇸',
    email: 'isabella@bbva.es',
    company: 'BBVA',
    role: 'Product Manager',
    joined: '2021-06-14',
    location: 'Barcelona, Spain',
    balance: 5321.77,
    details:
      'Isabella manages product development and strategy for BBVA’s digital platforms.',
  },
  {
    id: '8',
    name: 'Benjamin Harris',
    availability: 'offline',
    avatar: '8.png',
    status: 'active',
    flag: '🇯🇵',
    email: 'benjamin@sony.jp',
    company: 'Sony',
    role: 'Marketing Lead',
    joined: '2020-10-22',
    location: 'Tokyo, Japan',
    balance: 8452.39,
    details:
      'Benjamin leads innovative marketing campaigns for Sony’s flagship products.',
  },
  {
    id: '9',
    name: 'Olivia Brown',
    availability: 'online',
    avatar: '9.png',
    status: 'active',
    flag: '🇫🇷',
    email: 'olivia@lvmh.fr',
    company: 'LVMH',
    role: 'Data Scientist',
    joined: '2019-09-17',
    location: 'Paris, France',
    balance: 7345.1,
    details:
      'Olivia is a data scientist optimizing sales and marketing analytics at LVMH.',
  },
  {
    id: '10',
    name: 'Michael Clark',
    availability: 'away',
    avatar: '10.png',
    status: 'inactive',
    flag: '🇮🇹',
    email: 'michael@eni.it',
    company: 'ENI',
    role: 'Engineer',
    joined: '2023-02-11',
    location: 'Milan, Italy',
    balance: 5214.88,
    details:
      'Michael is a lead engineer developing sustainable energy solutions at ENI.',
  },
  {
    id: '11',
    name: 'Ava Wilson',
    availability: 'busy',
    avatar: '11.png',
    status: 'active',
    flag: '🇧🇷',
    email: 'ava@vale.br',
    company: 'Vale',
    role: 'Software Engineer',
    joined: '2022-12-01',
    location: 'Rio de Janeiro, Brazil',
    balance: 9421.5,
    details:
      'Ava develops cutting-edge software to optimize mining operations at Vale.',
  },
  {
    id: '12',
    name: 'David Young',
    availability: 'offline',
    avatar: '12.png',
    status: 'active',
    flag: '🇮🇳',
    email: 'david@tata.in',
    company: 'Tata',
    role: 'Sales Manager',
    joined: '2020-03-27',
    location: 'Mumbai, India',
    balance: 4521.67,
    details:
      'David manages international sales for Tata’s industrial and automotive products.',
  },
];

export default function DataGridDemo() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: true },
  ]);

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        id: 'id',
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <Button
              {...{
                className: 'size-6 text-muted-foreground',
                onClick: row.getToggleExpandedHandler(),
                mode: 'icon',
                variant: 'ghost',
              }}
            >
              {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
            </Button>
          ) : null;
        },
        size: 12,
        meta: {
          expandedContent: (row) => (
            <div className="ms-12 py-3 text-muted-foreground text-sm">
              {row.details}
            </div>
          ),
        },
      },
      {
        accessorKey: 'name',
        id: 'name',
        header: 'Name',
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage
                  src={`/media/avatars/${row.original.avatar}`}
                  alt={row.original.name}
                />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <Link
                href="#"
                className="font-medium text-foreground hover:text-primary"
              >
                {row.original.name}
              </Link>
            </div>
          );
        },
        size: 175,
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => (
          <Link
            href={`mailto:${info.getValue()}`}
            className="hover:text-primary hover:underline"
          >
            {info.getValue() as string}
          </Link>
        ),
        size: 150,
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: (info) => <span>{info.getValue() as string}</span>,
        size: 150,
        meta: {
          headerClassName: '',
          cellClassName: 'text-start',
        },
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;

          if (status == 'active') {
            return (
              <Badge variant="primary" appearance="outline">
                Approved
              </Badge>
            );
          } else {
            return (
              <Badge variant="destructive" appearance="outline">
                Pending
              </Badge>
            );
          }
        },
        size: 100,
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil((demoData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    getRowCanExpand: (row) => Boolean(row.original.details),
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid
      table={table}
      recordCount={demoData?.length || 0}
      tableLayout={{ headerBackground: false }}
    >
      <div className="w-full space-y-2.5">
        <DataGridContainer border={false}>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  );
}
