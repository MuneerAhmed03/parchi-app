import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

export default function HelpModal() {
  return (
    <Dialog>
      <DialogTrigger className="fixed bottom-2 right-2 md:bottom-4 md:right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:shadow-xl z-50">
        <HelpCircle className="w-6 h-6 text-black" />
      </DialogTrigger>
      <DialogContent className="bg-white font-pencil max-w-[95vw] md:max-w-2xl mx-auto h-[80vh] md:h-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center text-primary">
            How to Play Parchi
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 md:space-y-4 p-3 md:p-4 text-gray-700">
          <section className="space-y-1.5 md:space-y-2">
            <h3 className="text-base md:text-lg font-bold text-primary">
              Game Overview
            </h3>
            <p className="text-sm md:text-base">
              Parchi is a card matching game where players try to collect four cards
              of the same title to win.
            </p>
          </section>

          <section className="space-y-1.5 md:space-y-2">
            <h3 className="text-base md:text-lg font-bold text-primary">
              Game Setup
            </h3>
            <ul className="list-disc pl-4 md:pl-5 space-y-0.5 md:space-y-1 text-sm md:text-base">
              <li>4 players are required to start the game</li>
              <li>Each player must submit a unique title in the lobby</li>
              <li>Cards with player-submitted titles are distributed randomly</li>
            </ul>
          </section>

          <section className="space-y-1.5 md:space-y-2">
            <h3 className="text-base md:text-lg font-bold text-primary">
              How to Play
            </h3>
            <ul className="list-disc pl-4 md:pl-5 space-y-0.5 md:space-y-1 text-sm md:text-base">
              <li>Players take turns clockwise</li>
              <li>On your turn, select a card and pass it to the next player</li>
              <li>Try to collect four cards with the same title</li>
              <li>When you have four matching cards, click "Claim Win"</li>
            </ul>
          </section>

          <section className="space-y-1.5 md:space-y-2">
            <h3 className="text-base md:text-lg font-bold text-primary">
              Winning
            </h3>
            <p className="text-sm md:text-base">
              The first player to collect four cards with matching titles wins the
              game!
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
