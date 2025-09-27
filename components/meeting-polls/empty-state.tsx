"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Filter } from "lucide-react";

interface EmptyStateProps {
  hasPolls: boolean;
  searchQuery: string;
  statusFilter: string;
}

export function EmptyState({ hasPolls, searchQuery, statusFilter }: EmptyStateProps) {
  if (hasPolls && (searchQuery || statusFilter !== "all")) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No polls found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? `No polls match "${searchQuery}"`
                : `No polls with status "${statusFilter}"`
              }
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Clear filters
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Create your first poll</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start by creating a meeting poll to find the best time for your team to meet.
          </p>
          <Button asChild className="btn-primary">
            <a href="/polls/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Poll
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
