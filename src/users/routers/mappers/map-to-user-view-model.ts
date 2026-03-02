import { UserViewModel } from "../../dto/user.view.interface";
import { WithId } from "mongodb";
import { User } from "../../dto/user.service.interface";

export const mapToUserViewModel = (user: WithId<User>): UserViewModel => ({
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt.toISOString()
});

export const mapToUserViewModels = (users: WithId<User>[]): UserViewModel[] => 
    users.map(mapToUserViewModel);
