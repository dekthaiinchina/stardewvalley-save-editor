<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { getSaveManager } from "$lib/SaveManager.svelte";
    import UiButton from "$lib/ui/UIButton.svelte";
    import Router from "./Router.svelte";
    interface Props {
        children: import("svelte").Snippet;
    }

    let { children }: Props = $props();

    const saveManager = getSaveManager();

    const cancel = () => saveManager.reset();
    const download = async () => saveManager.download();

    $effect(() => {
        if (!saveManager.save) {
            goto(`${base}/`);
        }
    });
</script>

{#if saveManager.save}
    <div class="outer-wrapper">
        <Router />
        <div class="inner-wrapper">
            <div class="content">
                {@render children()}
            </div>
            <div class="sidebar">
                <UiButton
                    onclick={() => cancel()}
                    alt="Exit"
                    data-testid="cancel-button"
                    >❌
                </UiButton>
                <UiButton
                    onclick={() => download()}
                    alt="Save"
                    data-testid="save-button"
                    >💾
                </UiButton>
                <UiButton
                    alt="Previous Character"
                    onclick={() => saveManager.save?.prevFarmer()}
                    >⬅️
                </UiButton>
                <UiButton
                    alt="Next Character"
                    onclick={() => saveManager.save?.nextFarmer()}
                    >➡️
                </UiButton>
            </div>
        </div>
    </div>
{/if}

<style>
    .sidebar {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .outer-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .inner-wrapper {
        display: flex;
        flex-direction: row;
        gap: 8px;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 500px;
    }
</style>
