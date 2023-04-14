# Reattaching a Classic Hybrid Runner

#

## Overview

In some situations, you may need to reattach your hybrid runner after making
configuration changes in your cluster. To do so, please gather the required
information below, and then run the `codefresh attach runtime` command.

## Details

**Information you will need:**

  * The name of your `runtime`
  * The kubernetes context of your `runtime`
  * The kubernetes namespace of your `runtime`
  * The name of your `runner`
  * The kubernetes context of your `agent`
  * The kubernetes namespace of your `agent`

Running `codefresh runner info` will give you this information. The `NAME` is
the agent name, and under `RUNTIMES` you see the names of all of runtimes that
are already attached to this cluster, in the format kube-context-name/kube-
namespace.  
  
 **Command to run:**

Having gathered all the above, the command to reattach a runtime is:  
  
` codefresh attach runtime  
--runtime-name [RUNTIME_NAME] \  
--runtime-kube-context-name [RUNTIME_KUBE_CONTEXT] \  
--runtime-kube-namespace [RUNTIME_KUBE_NAMESPACE] \  
--agent-kube-context-name [AGENT_KUBE_CONTEXT] \  
--agent-kube-namespace [AGENT_KUBE_NAMESPACE] \  
--agent-name [AGENT_NAME] \  
--restart-agent`

In many default installations, the runtime and agent names may match.

