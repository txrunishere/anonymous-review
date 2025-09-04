import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui";

export function HowToUse() {
  return (
    <div className="flex justify-end m-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>How to use ?</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How to use ?</DialogTitle>
          </DialogHeader>
          <div>
            <ul>
              <li>
                <h2 className="font-bold">Share Your Link</h2>
                <p className="ml-4 text-muted-foreground text-sm">
                  ⦁ Copy your unique link.
                </p>
                <p className="ml-4 text-muted-foreground text-sm">
                  ⦁ Share it with friends, family, or anyone you want feedback
                  from.
                </p>
              </li>
              <li>
                <h2 className="font-bold">Receive Anonymous Reviews</h2>
                <p className="ml-4 text-muted-foreground text-sm">
                  ⦁ People can write reviews about you using your link.
                </p>
                <p className="ml-4 text-muted-foreground text-sm">
                  ⦁ Reviews are 100% anonymous — you won’t know who wrote them.
                </p>
              </li>
              <li>
                <h2 className="font-bold">View Your Reviews</h2>
                <p className="ml-4 text-muted-foreground text-sm">
                  ⦁ Log in to your account anytime to read new reviews.
                </p>
              </li>
            </ul>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
