/// #if !env.standalone
import './Bg/Bg';
/// #endif

/// #if env.standalone
import './Bg/BgStandalone';
/// #endif

import './Menu/Menu';
// todo: пересекаются css классы и css классы для js.
//  использовать либо БЭМ, либо css модули как-то прикрутить
import './ProgressBar/ProgressBar';
import './ProgressBarVaporwave/ProgressBarVaporwave';
import './Weather/Weather';

import './CreateNewPreset/CreateNewPreset';
