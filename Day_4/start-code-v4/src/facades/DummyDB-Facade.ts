import { IFriend } from '../interfaces/IFriend';

function singleValuePromise<T>(val: T | null): Promise<T | null> {
  return new Promise<T | null>((resolve, reject) => {
    setTimeout(() => resolve(val), 0);
  })
}
function arrayValuePromise<T>(val: Array<T>): Promise<Array<T>> {
  return new Promise<Array<T>>((resolve, reject) => {
    setTimeout(() => resolve(val), 0);
  })
}

// export default class FriendsFacade {
class FriendsFacade {
  friends: Array<IFriend> = [
    { id: "id1", firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: "secret" },
    { id: "id2", firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: "secret" },
  ]
  async addFriend(friend: IFriend): Promise<IFriend | null> {
    // Add friend to the friends array
    this.friends.push(friend);

    return singleValuePromise<IFriend | null>(friend);
    // throw new Error("Not Yet Implemented")
  }
  async deleteFriend(friendEmail: string): Promise<IFriend | null> {
    // Find friend from the friends array
    let friend: IFriend | null = this.friends.find((f) => f.email === friendEmail) || null;

    return singleValuePromise<IFriend | null>(friend);
    // throw new Error("Not Yet Implemented But return element deleted or null")
  }
  async getAllFriends(): Promise<Array<IFriend>> {
    const f: Array<IFriend> = this.friends;
    return arrayValuePromise<IFriend>(f);
  }
  async getFriend(friendEmail: string): Promise<IFriend | null> {
    let friend: IFriend | null
    friend = this.friends.find(f => f.email === friendEmail) || null;
    return singleValuePromise<IFriend>(friend);
  }
  async updateFriend(friendId: string): Promise<IFriend | null> {
    let friend: IFriend | null = this.friends.find(f => f.id === friendId) || null;
    
    return singleValuePromise<IFriend>(friend);
  }
}

const facade = new FriendsFacade();
export default facade;
