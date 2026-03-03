"use client";

import { useState } from "react";
import {
    Users,
    Search,
    Pencil,
    Trash2,
    ShieldCheck,
    UserPlus,
    Loader2,
    Camera,
    UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UniTable, { ProductCell, ActionCell, ActionButton } from "@/components/shared/UniTable";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAllUsers, useCreateUser, useUpdateUser, useDeleteUser } from "@/features/main/profile/hooks/useUser";
import { toast } from "sonner";
import { userFormSchema, UserFormData } from "@/features/main/profile/schemas/user.schema";

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const { data: usersResponse, isLoading: isUsersLoading } = useAllUsers({
        page: currentPage,
        limit
    });
    const createUserMutation = useCreateUser();
    const updateUserMutation = useUpdateUser();
    const deleteUserMutation = useDeleteUser();

    const users = usersResponse?.data || [];

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
    });

    const handleEdit = (user: any) => {
        setIsEditing(true);
        setCurrentUser(user);
        reset({
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            role: user.role,
            password: "",
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (userId: string) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUserMutation.mutateAsync(userId);
                toast.success("User deleted successfully");
            } catch (error) {
                toast.error("Failed to delete user");
            }
        }
    };

    const onSubmit = async (data: UserFormData) => {
        try {
            if (isEditing && currentUser) {
                const updateData: any = { ...data };
                if (updateData.email === currentUser.email) {
                    delete updateData.email;
                }
                if (!updateData.password) delete updateData.password;
                await updateUserMutation.mutateAsync({ userId: currentUser._id, data: updateData });
                toast.success("User updated successfully");
            } else {
                await createUserMutation.mutateAsync(data);
                toast.success("User created successfully");
            }
            setIsDialogOpen(false);
            reset();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    const handleOpenDialog = () => {
        setIsEditing(false);
        setCurrentUser(null);
        reset({
            name: "",
            email: "",
            phone: "",
            role: "user",
            password: "",
        });
        setIsDialogOpen(true);
    };

    const COLUMNS = [
        {
            id: "name",
            header: "User Profile",
            cell: (value: any, row: any) => (
                <ProductCell
                    title={row.name}
                    subtitle={row.email}
                    image={row.profileImg}
                    imageSize="h-10 w-10"
                    className="gap-4"
                />
            ),
            className: "min-w-[250px]"
        },
        {
            id: "role",
            header: "Access Level",
            accessorKey: "role",
            cell: (value: any) => (
                <span className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider",
                    value === "admin" ? "bg-violet-100 text-violet-700" :
                        value === "manager" ? "bg-blue-100 text-blue-700" :
                            "bg-zinc-100 text-zinc-700"
                )}>
                    {value}
                </span>
            )
        },
        { id: "phone", header: "Phone", accessorKey: "phone", className: "text-zinc-500 font-medium" },
        {
            id: "status",
            header: "Status",
            cell: (value: any, row: any) => (
                <span className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                    row.active !== false ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                )}>
                    {row.active !== false ? "Active" : "Inactive"}
                </span>
            )
        },
        {
            id: "actions",
            header: "Actions",
            cell: (value: any, row: any) => (
                <ActionCell>
                    <ActionButton icon={Pencil} onClick={() => handleEdit(row)} />
                    {/* <ActionButton icon={ShieldCheck} onClick={() => console.log("Perms", row._id)} /> */}
                    <ActionButton icon={Trash2} variant="danger" onClick={() => handleDelete(row._id)} />
                </ActionCell>
            ),
            headerClassName: "justify-center text-center",
            className: "justify-center text-center"
        }
    ];

    const filteredUsers = users.filter((u: any) =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                        <Users className="size-4" />
                        <span>Customer Base</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">User Directory</h2>
                    <p className="text-zinc-500">Overview of all registered users and their permissions.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={handleOpenDialog} className="rounded-xl px-5 h-11 shadow-lg shadow-primary/20">
                        <UserPlus className="size-5 mr-2" /> Add New User
                    </Button>
                </div>
            </div>

            {/* User Stats Grid (Condensed) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <div className="size-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <UserCheck className="size-6 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active Users</p>
                        <h4 className="text-2xl font-black text-zinc-900 dark:text-white mt-1">{usersResponse?.results || 0}</h4>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                {isUsersLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200">
                        <Loader2 className="size-10 text-primary animate-spin mb-4" />
                        <p className="text-zinc-500 font-medium">Fetching directory...</p>
                    </div>
                ) : (
                    <UniTable
                        data={filteredUsers}
                        columns={COLUMNS}
                        enablePagination={true}
                        pageSize={limit}
                        serverPagination={{
                            currentPage,
                            totalPages: usersResponse?.paginationResult?.numberOfPages || 1,
                            totalItems: usersResponse?.results || 0,
                            onPageChange: (page) => setCurrentPage(page)
                        }}
                        itemLabel="users"
                        className="rounded-3xl shadow-sm"
                    />
                )}
            </motion.div>

            {/* Add/Edit User Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-xl rounded-3xl p-0 border-none bg-white dark:bg-zinc-950 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="p-8 border-b border-zinc-100 dark:border-zinc-800">
                            <DialogTitle className="text-2xl font-black">{isEditing ? "Update User Profile" : "Register New User"}</DialogTitle>
                            <DialogDescription>
                                Set user identity and access levels across the platform.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Full Name</Label>
                                    <Input id="name" {...register("name")} className="h-12 rounded-xl bg-zinc-50 border-none" />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</Label>
                                    <Input id="email" type="email" {...register("email")} className="h-12 rounded-xl bg-zinc-50 border-none" />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Phone Number</Label>
                                    <Input id="phone" {...register("phone")} className="h-12 rounded-xl bg-zinc-50 border-none" />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">User Role</Label>
                                    <Select
                                        onValueChange={(val) => setValue("role", val)}
                                        value={watch("role")}
                                    >
                                        <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-none">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user"> (User)</SelectItem>
                                            <SelectItem value="manager">Manager</SelectItem>
                                            <SelectItem value="admin">Administrator</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" title={isEditing ? "Leave blank to keep current password" : "Enter password"} className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
                                    Password {isEditing && <span className="text-[10px] text-zinc-400 font-normal normal-case">(Optional)</span>}
                                </Label>
                                <Input id="password" type="password" {...register("password")} className="h-12 rounded-xl bg-zinc-50 border-none" />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="passwordConfirm" title={isEditing ? "Leave blank to keep current password" : "Enter password"} className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
                                    PasswordConfirm {isEditing && <span className="text-[10px] text-zinc-400 font-normal normal-case">(Optional)</span>}
                                </Label>
                                <Input id="passwordConfirm" type="password" {...register("passwordConfirm")} className="h-12 rounded-xl bg-zinc-50 border-none" />
                                {errors.passwordConfirm && <p className="text-red-500 text-xs mt-1">{errors.passwordConfirm.message}</p>}
                            </div>

                        </div>

                        <DialogFooter className="p-8 border-t border-zinc-100 dark:border-zinc-800">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12">Cancel</Button>
                            <Button type="submit" disabled={createUserMutation.isPending || updateUserMutation.isPending} className="rounded-xl h-12 px-8 font-black">
                                {createUserMutation.isPending || updateUserMutation.isPending ? <Loader2 className="animate-spin" /> : (isEditing ? "Update Account" : "Create Account")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

