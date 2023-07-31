import React, { useContext } from "react";
import { supabase } from "../supabaseClient";

const GraphContext = React.createContext();

export function useGraph() {
  return useContext(GraphContext);
}

export function GraphProvider({ children }) {
  const value = {
    allStacks,
    getStack
  }

  async function allStacks() {
    const { data, error } = await supabase
      .from('stack_info')
      .select('*')
    return { data, error }
  }

  async function getStack(stackName) {
    const { data, error } = await supabase
      .from(stackName)
      .select('*')
    return { data, error }
  }

  return (
    <GraphContext.Provider value={value}>
      {children}
    </GraphContext.Provider>
  );
}