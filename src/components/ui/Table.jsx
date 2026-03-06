import * as React from "react"
import { cn } from "../../lib/utils"

const Table = React.forwardRef(({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto border border-gray-300">
        <table
            ref={ref}
            className={cn("w-full caption-bottom text-xs border-collapse", className)}
            {...props}
        />
    </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("bg-gray-200 [&_tr]:border-b border-gray-300", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        {...props}
    />
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            "border-b border-gray-200 transition-colors hover:bg-blue-50/50 data-[state=selected]:bg-blue-100 even:bg-gray-50",
            className
        )}
        {...props}
    />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            "h-8 px-2 text-left align-middle font-bold text-gray-700 border-r border-gray-300 last:border-r-0 [&:has([role=checkbox])]:pr-0",
            className
        )}
        {...props}
    />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn("p-2 align-middle border-r border-gray-200 last:border-r-0 [&:has([role=checkbox])]:pr-0", className)}
        {...props}
    />
))
TableCell.displayName = "TableCell"

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell }
