import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type SystemSettings, type UpdateSystemSettings } from "@shared/schema";

export function useSettings() {
  return useQuery({
    queryKey: [api.settings.get.path],
    queryFn: async () => {
      const res = await fetch(api.settings.get.path, { credentials: "include" });
      if (!res.ok) {
        // Fallback for simulation purposes if backend is not fully ready
        if (res.status === 404) {
          return {
            id: 1,
            mode: 'auto',
            simulationLevel: 'medium',
            manualActiveLane: 0
          } as SystemSettings;
        }
        throw new Error("Failed to fetch settings");
      }
      return api.settings.get.responses[200].parse(await res.json());
    },
    // Start with default data to prevent loading states while waiting for mock backend
    initialData: {
      id: 1,
      mode: 'auto',
      simulationLevel: 'medium',
      manualActiveLane: 0
    } as SystemSettings
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: UpdateSystemSettings) => {
      const res = await fetch(api.settings.update.path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 404) {
          // Mock success if endpoint doesn't exist yet
          return { ...updates, id: 1 } as SystemSettings;
        }
        throw new Error("Failed to update settings");
      }
      return api.settings.update.responses[200].parse(await res.json());
    },
    onMutate: async (newSettings) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: [api.settings.get.path] });
      const previousSettings = queryClient.getQueryData<SystemSettings>([api.settings.get.path]);
      
      if (previousSettings) {
        queryClient.setQueryData<SystemSettings>([api.settings.get.path], {
          ...previousSettings,
          ...newSettings
        });
      }
      return { previousSettings };
    },
    onError: (err, newSettings, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData([api.settings.get.path], context.previousSettings);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [api.settings.get.path] });
    },
  });
}
