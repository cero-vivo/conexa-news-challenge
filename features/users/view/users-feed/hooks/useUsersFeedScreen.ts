import { HttpUsersGateway } from "@/features/users/infrastructure/gateways/UsersGateway";
import { UsersPresenter } from "@/features/users/infrastructure/presenters/UsersPresenter";
import { User } from "@/features/users/model/entities/User";
import { IUsersScreen } from "@/features/users/model/presenter/IUsersPresenter";
import { useEffect, useState } from "react";

export const useUsersFeedScreen = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<"idle" | "loading" | "error" | "success">("idle");
    const [error, setError] = useState<string | null>(null);

    const screenHandler: IUsersScreen = {
        getUsersSuccess: (users: User[]) => {
            setUsers(users);
            setLoading("success");
            setError(null);
        },
        getUsersError: (error: any) => {
            setError(error?.message || "Failed to load users");
            setLoading("error");
        },
    }

    const presenter = UsersPresenter(HttpUsersGateway(), screenHandler);

    useEffect(() => {
        setLoading("loading");
        presenter.getUsers();
    }, []);

    return {
        users,
        loading,
        error,
    }
} 