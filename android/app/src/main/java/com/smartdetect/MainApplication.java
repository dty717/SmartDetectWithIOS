package com.smartdetect;

import android.app.ActivityManager;
import android.app.Application;
import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.os.Process;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.heytap.msp.push.callback.ICallBackResultService;
import com.smartdetect.generated.BasePackageList;
import com.xiaomi.channel.commonutils.logger.LoggerInterface;
import com.xiaomi.mipush.sdk.Logger;
import com.xiaomi.mipush.sdk.MiPushClient;

import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;

import expo.modules.updates.UpdatesController;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import javax.annotation.Nullable;
import com.heytap.msp.push.HeytapPushManager;

public class MainApplication extends Application implements ReactApplication {

  // user your appid the key.
  private static final String XIAOMI_APP_ID = "2882303761520014207";
  // user your appid the key.
  private static final String XIAOMI_APP_KEY = "5572001481207";


  // user your appid.
  private static final String OPPO_APP_ID = "30804889";
  // user your appkey.
  private static final String OPPO_APP_KEY = "453c5b0b6df54b94bc75c14999dc5170";
  // user your appsecret.
  public static final String OPPO_APP_SECRET = "4c67026b018743ba8189303f50dd51e8";

  // 此TAG在adb logcat中检索自己所需要的信息， 只需在命令行终端输入 adb logcat | grep
  // com.dty.mipushdemo
  public static final String TAG = "com.smartdetect";

  private static DemoHandler sHandler = null;
  private static MainActivity sMainActivity = null;

  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(
          new BasePackageList().getPackageList()
  );

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new ModuleRegistryAdapter(mModuleRegistryProvider));
      packages.add(new MyAppPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected @Nullable String getJSBundleFile() {
      if (BuildConfig.DEBUG) {
        return super.getJSBundleFile();
      } else {
        return UpdatesController.getInstance().getLaunchAssetFile();
      }
    }

    @Override
    protected @Nullable String getBundleAssetName() {
      if (BuildConfig.DEBUG) {
        return super.getBundleAssetName();
      } else {
        return UpdatesController.getInstance().getBundleAssetName();
      }
    }
  };

  private ICallBackResultService mPushCallback = new ICallBackResultService() {
    @Override
    public void onRegister(int code, String s) {
      if (code == 0) {
        MainActivity.pid = s;
        MainActivity.pType = "oppo";
//        showResult("注册成功", "registerId:" + s);
      } else {
//        showResult("注册失败", "code=" + code + ",msg=" + s);
      }
    }

    @Override
    public void onUnRegister(int code) {
      if (code == 0) {
//        showResult("注销成功", "code=" + code);
      } else {
//        showResult("注销失败", "code=" + code);
      }
    }

    @Override
    public void onGetPushStatus(final int code, int status) {
      if (code == 0 && status == 0) {
//        showResult("Push状态正常", "code=" + code + ",status=" + status);
      } else {
//        showResult("Push状态错误", "code=" + code + ",status=" + status);
      }
    }

    @Override
    public void onGetNotificationStatus(final int code, final int status) {
      if (code == 0 && status == 0) {
//        showResult("通知状态正常", "code=" + code + ",status=" + status);
      } else {
//        showResult("通知状态错误", "code=" + code + ",status=" + status);
      }
    }

    @Override
    public void onError(int i, String s) {
//      showResult("onError", "onError code : " + i + "   message : " + s);
    }

    @Override
    public void onSetPushTime(final int code, final String s) {
//      showResult("SetPushTime", "code=" + code + ",result:" + s);
    }

  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    try {
      HeytapPushManager.init(this, false);
      HeytapPushManager.register(this, OPPO_APP_KEY, OPPO_APP_SECRET, mPushCallback);//setPushCallback接口也可设置callback
      HeytapPushManager.requestNotificationPermission();
    } catch (Exception e) {

    }

    SoLoader.init(this, /* native exopackage */ false);
  // 注册push服务，注册成功后会向DemoMessageReceiver发送广播
    // 可以从DemoMessageReceiver的onCommandResult方法中MiPushCommandMessage对象参数中获取注册信息
    if (shouldInit()) {
      MiPushClient.registerPush(this, XIAOMI_APP_ID, XIAOMI_APP_KEY);
    }

    LoggerInterface newLogger = new LoggerInterface() {

      @Override
      public void setTag(String tag) {
        // ignore
      }

      @Override
      public void log(String content, Throwable t) {
        Log.d(TAG, content, t);
      }

      @Override
      public void log(String content) {
        Log.d(TAG, content);
      }
    };
    Logger.setLogger(this, newLogger);
    if (sHandler == null) {
      sHandler = new DemoHandler(getApplicationContext());
    }
    if (!BuildConfig.DEBUG) {
      UpdatesController.initialize(this);
    }

    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
          Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.smartdetect.ReactNativeFlipper");
        aClass
                .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
  private boolean shouldInit() {
    ActivityManager am = ((ActivityManager) getSystemService(Context.ACTIVITY_SERVICE));
    List<ActivityManager.RunningAppProcessInfo> processInfos = am.getRunningAppProcesses();
    String mainProcessName = getPackageName();
    int myPid = Process.myPid();
    for (ActivityManager.RunningAppProcessInfo info : processInfos) {
      if (info.pid == myPid && mainProcessName.equals(info.processName)) {
        return true;
      }
    }
    return false;
  }

  public static DemoHandler getHandler() {
    return sHandler;
  }

  public static void setMainActivity(MainActivity activity) {
    sMainActivity = activity;
  }

  public static class DemoHandler extends Handler {

    private Context context;

    public DemoHandler(Context context) {
      this.context = context;
    }

    @Override
    public void handleMessage(Message msg) {
      String s = (String) msg.obj;
      if (sMainActivity != null) {
        sMainActivity.refreshLogInfo();
      }
      if (!TextUtils.isEmpty(s)) {
        Toast.makeText(context, s, Toast.LENGTH_LONG).show();
      }
    }
  }
}
