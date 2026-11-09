package com.linvuu.app;

import androidx.core.content.ContextCompat;
import androidx.credentials.ClearCredentialStateRequest;
import androidx.credentials.Credential;
import androidx.credentials.CredentialManager;
import androidx.credentials.CredentialManagerCallback;
import androidx.credentials.CustomCredential;
import androidx.credentials.GetCredentialRequest;
import androidx.credentials.GetCredentialResponse;
import androidx.credentials.exceptions.ClearCredentialException;
import androidx.credentials.exceptions.GetCredentialCancellationException;
import androidx.credentials.exceptions.GetCredentialException;
import androidx.credentials.exceptions.NoCredentialException;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.libraries.identity.googleid.GetSignInWithGoogleOption;
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential;

/**
 * Login com Google nativo (Credential Manager do Android). O popup do Firebase não funciona dentro do WebView;
 * aqui o Android mostra a escolha de conta e devolve só o ID token do Google, que o Firebase Web troca pela sessão.
 * Nada é guardado neste plugin.
 */
@CapacitorPlugin(name = "LinvuuGoogle")
public class LinvuuGooglePlugin extends Plugin {
    @PluginMethod
    public void entrar(PluginCall call) {
        String clientId = call.getString("clientId");
        if (clientId == null || !clientId.endsWith(".apps.googleusercontent.com")) { call.reject("clientId inválido", "CONFIG"); return; }
        GetSignInWithGoogleOption opcao = new GetSignInWithGoogleOption.Builder(clientId).build();
        GetCredentialRequest pedido = new GetCredentialRequest.Builder().addCredentialOption(opcao).build();
        CredentialManager.create(getContext()).getCredentialAsync(getActivity(), pedido, null, ContextCompat.getMainExecutor(getContext()),
            new CredentialManagerCallback<GetCredentialResponse, GetCredentialException>() {
                @Override public void onResult(GetCredentialResponse resposta) {
                    Credential c = resposta.getCredential();
                    if (c instanceof CustomCredential && GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL.equals(c.getType())) {
                        try {
                            GoogleIdTokenCredential g = GoogleIdTokenCredential.createFrom(c.getData());
                            JSObject r = new JSObject(); r.put("idToken", g.getIdToken()); call.resolve(r);
                        } catch (Exception e) { call.reject("Credencial do Google inválida", "FALHA"); }
                    } else call.reject("Credencial inesperada", "FALHA");
                }
                @Override public void onError(GetCredentialException e) {
                    if (e instanceof GetCredentialCancellationException) call.reject("Login cancelado", "CANCELADO");
                    else if (e instanceof NoCredentialException) call.reject("Nenhuma conta Google no aparelho", "SEM_CONTA");
                    else call.reject(e.getClass().getSimpleName(), "FALHA");
                }
            });
    }

    @PluginMethod
    public void sair(PluginCall call) {
        CredentialManager.create(getContext()).clearCredentialStateAsync(new ClearCredentialStateRequest(), null, ContextCompat.getMainExecutor(getContext()),
            new CredentialManagerCallback<Void, ClearCredentialException>() {
                @Override public void onResult(Void v) { call.resolve(); }
                @Override public void onError(ClearCredentialException e) { call.resolve(); }
            });
    }
}
