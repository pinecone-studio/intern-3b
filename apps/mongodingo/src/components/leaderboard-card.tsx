"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Trophy, TrendingUp, Medal } from "lucide-react"

const leaderboard = [
  { rank: 1, name: "Болд", xp: 2450, trend: "up" },
  { rank: 2, name: "Сарангэрэл", xp: 2280, trend: "up" },
  { rank: 3, name: "You", xp: 1240, isYou: true, trend: "same" },
  { rank: 4, name: "Ганбаатар", xp: 1180, trend: "down" },
  { rank: 5, name: "Мөнхбат", xp: 980, trend: "up" },
]

export function LeaderboardCard() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-amber-500" />
        </div>
        <h3 className="text-xl font-bold">Leaderboard</h3>
      </div>

      <div className="space-y-2">
        {leaderboard.map((player, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <div
              className={`flex items-center gap-3 p-3 rounded-lg ${
                player.isYou ? "bg-primary/10 border border-primary/30" : "bg-muted/20"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  player.rank === 1
                    ? "bg-amber-500 text-white"
                    : player.rank === 2
                      ? "bg-slate-400 text-white"
                      : player.rank === 3
                        ? "bg-orange-600 text-white"
                        : "bg-muted text-foreground"
                }`}
              >
                {player.rank <= 3 ? <Medal className="w-4 h-4" /> : player.rank}
              </div>

              <div className="flex-grow">
                <div className="font-semibold">{player.name}</div>
                <div className="text-xs text-muted-foreground">{player.xp.toLocaleString()} XP</div>
              </div>

              {player.isYou && (
                <Badge variant="secondary" className="text-xs">
                  You
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground text-center">
          <TrendingUp className="w-4 h-4 inline mr-1" />
          {"You're doing great! Keep learning!"}
        </div>
      </div>
    </Card>
  )
}
